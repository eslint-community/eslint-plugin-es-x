/**
 * @author Toru Nagashima
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const scopeNodeType =
    /^(?:(?:Block|Switch|For(?:In|Of)?)Statement|CatchClause|Program)$/u
const containerNodeType =
    /^(?:For(?:In|Of)?Statement|(?:Arrow)?Function(?:Declaration|Expression))$/u

/**
 * Checks whether or not a given definition should be skipped.
 * @param {escope.Variable.DefEntry} def - A definition to check.
 * @param {escope.Variable.DefEntry[]} defs - A definition list which includes `def`.
 * @param {escope.Variable} variable - A variable which is defined by the definition.
 * @returns {boolean} Whether or not the definition should be skipped.
 */
function shouldSkip(def, defs, variable) {
    // To check re-declarations.
    if (defs.length >= 2 && def.type !== "TDZ") {
        return false
    }

    switch (def.type) {
        case "ClassName":
        case "FunctionName":
            return variable.scope.block === def.node

        case "Parameter":
        case "TDZ":
            return true

        case "Variable":
            return def.parent.kind !== "var"

        default:
            return false
    }
}

/**
 * Pseudo scope information for `var`.
 * Finds and creates information of a containing scope of a given declaration.
 */
class PseudoScope {
    /**
     * @param {escope.Variable.DefineEntry} def - A declaration.
     */
    constructor(def) {
        let node = null

        if (def.type === "Parameter") {
            node = def.node
        } else {
            node = (def.parent || def.node).parent

            while (!scopeNodeType.test(node.type)) {
                node = node.parent
            }
            if (
                node.parent != null &&
                containerNodeType.test(node.parent.type)
            ) {
                node = node.parent
            }
        }

        /**
         * The `Identifier` node of the declaration.
         * @type {ASTNode}
         */
        this.identifier = def.name

        /**
         * The start position of the scope.
         * @type {number}
         */
        this.start = node.range[0]

        /**
         * The end position of the scope.
         * @type {number}
         */
        this.end = node.range[1]

        /**
         * The `Identifier` nodes of re-declarations.
         * @type {ASTNode[]}
         */
        this.redeclarations = []

        /**
         * The `PseudoScope` instances which are nested.
         * @type {PseudoScope[]}
         */
        this.children = []

        /**
         * The flag of shadowing.
         * @type {boolean}
         */
        this.shadowing = false

        /**
         * The flag of used.
         * @type {boolean}
         */
        this.used = false
    }

    /**
     * Creates pseudo scopes of a given variable.
     * @param {escope.Variable} variable - A variable to create.
     * @returns {PseudoScope[]} the created scopes.
     */
    static createScopesFrom(variable) {
        const defs = variable.defs
        const scopes = []
        for (const def of defs) {
            if (!shouldSkip(def, defs, variable)) {
                PseudoScope.push(scopes, new PseudoScope(def))
            }
        }
        return scopes
    }

    /**
     * Adds a given scope into a given scope list.
     * This considers re-declarations and shadowing.
     * @param {PseudoScope[]} scopes - Scopes to be added.
     * @param {PseudoScope} newScope - A scope to add.
     * @returns {void}
     */
    static push(scopes, newScope) {
        for (const scope of scopes) {
            if (scope.start === newScope.start && scope.end === newScope.end) {
                scope.redeclarations.push(newScope.identifier)
                return
            }
            if (scope.start <= newScope.start && newScope.end <= scope.end) {
                newScope.markAsShadowing()
                PseudoScope.push(scope.children, newScope)
                return
            }
        }

        scopes.push(newScope)
    }

    /**
     * Finds a containing scope of a given reference.
     * @param {PseudoScope[]} scopes - Scopes to be domain.
     * @param {escope.Reference} reference - A reference to find.
     * @returns {PseudoScope|null} A containing scope of the reference.
     */
    static findScope(scopes, reference) {
        const range = reference.identifier.range

        for (const scope of scopes) {
            if (scope.start <= range[0] && range[1] <= scope.end) {
                return PseudoScope.findScope(scope.children, reference) || scope
            }
        }

        return null
    }

    /**
     * Turns a shadowing flag on.
     * @returns {void}
     */
    markAsShadowing() {
        this.shadowing = true
    }

    /**
     * Turns an used flag on.
     * @returns {void}
     */
    markAsUsed() {
        this.used = true
    }
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow illegal usage of variables as block-scoped.",
            category: "Possible Errors",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-es-x/blob/master/docs/rules/my-block-scoped-var.md",
        },
        fixable: null,
        schema: [],
        type: "suggestion",
    },
    create(context) {
        /**
         * Finds and reports references which are outside of valid scopes.
         * @param {ASTNode} node - A node to get variables.
         * @returns {void}
         */
        function checkForVariables(node) {
            const variables = context.getDeclaredVariables(node)
            for (const variable of variables) {
                const defs = variable.defs
                const lastDef = defs[defs.length - 1]

                // Skip except the last declaration.
                // Because `node.parent` is possibly not defined.
                if ((lastDef.parent || lastDef.node) !== node) {
                    continue
                }

                // Collect the containing scopes.
                const scopes = PseudoScope.createScopesFrom(variable)
                if (scopes.length === 0) {
                    continue
                }

                // Check whether or not any reading reference exists.
                // And while it does, warn references which does not belong to any
                // scope.
                let hasReadRef = false
                for (const reference of variable.references) {
                    const scope = PseudoScope.findScope(scopes, reference)

                    if (reference.isRead()) {
                        hasReadRef = true
                        if (scope != null) {
                            scope.markAsUsed()
                        }
                    }

                    if (scope == null) {
                        context.report({
                            node: reference.identifier,
                            message: '"{{name}}" is not defined.',
                            data: { name: reference.identifier.name },
                        })
                    }
                }

                // Warn re-declarations, shadowing, and unused.
                scopes.forEach(function walk(scope) {
                    for (const identifier of scope.redeclarations) {
                        context.report({
                            node: identifier,
                            message: '"{{name}}" is already defined.',
                            data: { name: identifier.name },
                        })
                    }

                    if (scope.shadowing) {
                        context.report({
                            node: scope.identifier,
                            message:
                                '"{{name}}" is already defined in the upper scope.',
                            data: { name: scope.identifier.name },
                        })
                    }

                    if (hasReadRef && !scope.used) {
                        context.report({
                            node: scope.identifier,
                            message: '"{{name}}" is defined but never used.',
                            data: { name: scope.identifier.name },
                        })
                    }

                    scope.children.forEach(walk)
                })
            }
        }

        return {
            VariableDeclaration: checkForVariables,
            FunctionDeclaration: checkForVariables,
            ClassDeclaration: checkForVariables,
            ImportDeclaration: checkForVariables,
        }
    },
}
