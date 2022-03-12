/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("assert")

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const SENTINEL_TYPE = /(?:Declaration|Statement)$/u
const MESSAGE = "Expected for-of statement."

/**
 * Checks whether the given outer node contains the given inner node.
 *
 * @param {ASTNode} outerNode - The outer node to check.
 * @param {ASTNode} innerNode - The inner node to check.
 * @returns {boolean} `true` if the outerNode contains the innerNode.
 */
function contains(outerNode, innerNode) {
    return (
        outerNode.range[0] <= innerNode.range[0] &&
        outerNode.range[1] >= innerNode.range[1]
    )
}

/**
 * Checks whether the given function node is the callback of `Array#forEach`
 * which can be replaced by a statement or not.
 *
 * @param {ASTNode} node - The function node to check.
 * @returns {boolean} `true` if the node is the callback of `Array#forEach`.
 */
function isCallbackOfArrayForEach(node) {
    const parent = node.parent

    return (
        parent.type === "CallExpression" &&
        parent.parent.type === "ExpressionStatement" &&
        parent.callee.type === "MemberExpression" &&
        parent.callee.property.type === "Identifier" &&
        parent.callee.property.name === "forEach" &&
        parent.arguments.length >= 1 &&
        parent.arguments[0] === node
    )
}

/**
 * Checks whether the given function node has valid parameters to replace by a
 * for-of statement.
 *
 * @param {ASTNode} node - The function node to check.
 * @returns {boolean} `true` if the node has valid parameters.
 */
function isValidParams(node) {
    return (
        node.params.length === 1 && node.params[0].type !== "AssignmentPattern"
    )
}

/**
 * Checks whether the given node is an identifier or a member expression which
 * does not include call expressions.
 *
 * @param {ASTNode} node - The node to check.
 * @returns {boolean} `true` if the node is a simple reference.
 */
function isSimpleReference(node) {
    return (
        node.type === "Identifier" ||
        node.type === "Literal" ||
        (node.type === "MemberExpression" &&
            isSimpleReference(node.object) &&
            isSimpleReference(node.property))
    )
}

/**
 * Checks whether the given function node is called recursively.
 *
 * @param {RuleContext} context - The rule context to get variables.
 * @param {ASTNode} node - The function node to check.
 * @returns {boolean} `true` if the node is called recursively.
 */
function isCalledRecursively(context, node) {
    return (
        node.id != null &&
        context.getDeclaredVariables(node)[0].references.length > 0
    )
}

/**
 * Checks whether the given `for` loop statement is a simple array traversing.
 *
 *     for (let i = 0; i < array.length; ++i) {
 *         // do something.
 *     }
 *
 * @param {ASTNode} node - The `for` loop node to check.
 * @returns {boolean} `true` if the node is a simple array traversing.
 */
//eslint-disable-next-line complexity
function isTraversingArray(node) {
    const init = node.init
    const test = node.test
    const update = node.update
    let indexDecl = null
    let lengthDecl = null

    return (
        init != null &&
        init.type === "VariableDeclaration" &&
        init.kind === "let" &&
        init.declarations.length >= 1 &&
        (indexDecl = init.declarations[0]) &&
        indexDecl.id.type === "Identifier" &&
        indexDecl.init != null &&
        indexDecl.init.type === "Literal" &&
        indexDecl.init.value === 0 &&
        test != null &&
        test.type === "BinaryExpression" &&
        test.operator === "<" &&
        test.left.type === "Identifier" &&
        test.left.name === indexDecl.id.name &&
        ((init.declarations.length === 1 &&
            test.right.type === "MemberExpression" &&
            test.right.property.type === "Identifier" &&
            test.right.property.name === "length") ||
            (init.declarations.length === 2 &&
                (lengthDecl = init.declarations[1]) &&
                lengthDecl.id.type === "Identifier" &&
                lengthDecl.init != null &&
                lengthDecl.init.type === "MemberExpression" &&
                lengthDecl.init.property.type === "Identifier" &&
                lengthDecl.init.property.name === "length" &&
                test.right.type === "Identifier" &&
                test.right.name === lengthDecl.id.name)) &&
        update != null &&
        ((update.type === "UpdateExpression" &&
            update.operator === "++" &&
            update.argument.type === "Identifier" &&
            update.argument.name === indexDecl.id.name) ||
            (update.type === "AssignmentExpression" &&
                update.operator === "+=" &&
                update.left.type === "Identifier" &&
                update.left.name === indexDecl.id.name &&
                update.right.type === "Literal" &&
                update.right.value === 1) ||
            (update.type === "AssignmentExpression" &&
                update.operator === "=" &&
                update.left.type === "Identifier" &&
                update.left.name === indexDecl.id.name &&
                update.right.type === "BinaryExpression" &&
                update.right.operator === "+" &&
                ((update.right.left.type === "Identifier" &&
                    update.right.left.name === indexDecl.id.name &&
                    update.right.right.type === "Literal" &&
                    update.right.right.value === 1) ||
                    (update.right.left.type === "Literal" &&
                        update.right.left.value === 1 &&
                        update.right.right.type === "Identifier" &&
                        update.right.right.name === indexDecl.id.name))))
    )
}

/**
 * Gets the iterating array's text of the given `for` loop.
 *
 * @param {SourceCode} sourceCode - The source code object to get text.
 * @param {ASTNode} node - The node of `for` loop statement.
 * @returns {string} The iterating array's text of the `for` loop.
 */
function getArrayTextOfForStatement(sourceCode, node) {
    return node.init.declarations.length === 2
        ? sourceCode.getText(node.init.declarations[1].init.object)
        : sourceCode.getText(node.test.right.object)
}

/**
 * Checks whether the given node is in an assignee or not.
 * @param {ASTNode} startNode The ndoe to check.
 * @returns {boolean} `true` if the node is in an assignee.
 */
function isAssignee(startNode) {
    let node = startNode

    while (node && node.parent && !SENTINEL_TYPE.test(node.type)) {
        const parent = node.parent
        const assignee =
            (parent.type === "AssignmentExpression" && parent.left === node) ||
            (parent.type === "AssignmentPattern" && parent.left === node) ||
            (parent.type === "VariableDeclarator" && parent.id === node) ||
            (parent.type === "UpdateExpression" && parent.argument === node)

        if (assignee) {
            return true
        }

        node = parent
    }

    return false
}

/**
 * Checks whether the all references of the index variable are used to get
 * array elements.
 *
 * @param {RuleContext} context - The rule context object.
 * @param {ASTNode} node - The `for` loop node which is a simple array
 * traversing.
 * @returns {boolean} `true` if the the all references of the index variable are
 * used to get array elements.
 */
function isIndexVarOnlyUsedToGetArrayElements(context, node) {
    const sourceCode = context.getSourceCode()
    const arrayText = getArrayTextOfForStatement(sourceCode, node)
    const indexVar = context.getDeclaredVariables(node.init)[0]

    return indexVar.references.every((reference) => {
        const id = reference.identifier

        return (
            !contains(node.body, id) ||
            (id.parent.type === "MemberExpression" &&
                id.parent.property === id &&
                sourceCode.getText(id.parent.object) === arrayText &&
                !isAssignee(id.parent))
        )
    })
}

/**
 * Checks whether the all references of the index variable are used to get
 * array elements.
 *
 * @param {RuleContext} context - The rule context object.
 * @param {ASTNode} node - The `for` loop node which is a simple array
 * traversing.
 * @returns {boolean} `true` if the the all references of the index variable are
 * used to get array elements.
 */
function isLengthVarOnlyUsedToTest(context, node) {
    if (node.init.declarations.length !== 2) {
        return true
    }
    const lengthVar = context.getDeclaredVariables(node.init.declarations[1])[0]

    return lengthVar.references.every(
        (reference) =>
            reference.init || contains(node.test, reference.identifier),
    )
}

/**
 * Gets the variable object of the given name.
 *
 * @param {RuleContext} context - The rule context to get variables.
 * @param {string} name - The variable name to get.
 * @returns {escope.Variable|null} The found variable.
 */
function getVariableByName(context, name) {
    let scope = context.getScope()

    while (scope != null) {
        const variable = scope.set.get(name)

        if (variable != null) {
            return variable
        }

        scope = scope.upper
    }
    return null
}

/**
 * Gets the context node, the node which is allocated to `this` of a function,
 * of the given function node.
 * If the found context node contains CallExpression, this ignores it.
 *
 * @param {ASTNode} node - The function node to get.
 * @returns {ASTNode|null} The found context node.
 */
function getContextNode(node) {
    const callNode = node.parent
    const contextNode =
        callNode.arguments.length >= 2
            ? callNode.arguments[1]
            : callNode.callee.object

    if (isSimpleReference(contextNode)) {
        return contextNode
    }
    return null
}

/**
 * Gets the variable object of the given context node.
 *
 * @param {RuleContext} context - The rule context to get variables.
 * @param {ASTNode} contextNode - The context node to get.
 * @returns {escope.Variable|null} The found variable of the context node.
 */
function getContextVariable(context, contextNode) {
    let node = contextNode
    while (node.type === "MemberExpression") {
        node = node.object
    }
    assert(node.type === "Identifier")

    const scope = context.getScope().upper
    return scope.set.get(node.name) || null
}

/**
 * Gets the 1st statement of the given `for` loop statement if the 1st statement
 * is variable declaration for the element variable.
 *
 *     for (let i = 0; i < list.length; ++i) {
 *         const element = list[i]
 *         // do something.
 *     }
 *
 * @param {SourceCode} sourceCode - The source code object to get the text of
 * nodes.
 * @param {ASTNode} node - The `for` loop statement to get.
 * @returns {ASTNode} The found declaration node.
 */
function getElementVariableDeclaration(sourceCode, node) {
    let declaration = null
    let declarator = null
    const indexText = node.test.left.name
    const arrayText = getArrayTextOfForStatement(sourceCode, node)
    const isElementVariableDeclaration =
        node.body.type === "BlockStatement" &&
        node.body.body.length > 0 &&
        (declaration = node.body.body[0]) &&
        declaration.type === "VariableDeclaration" &&
        (declarator = declaration.declarations[0]) &&
        declarator.init.type === "MemberExpression" &&
        declarator.init.computed &&
        declarator.init.property.type === "Identifier" &&
        declarator.init.property.name === indexText &&
        sourceCode.getText(declarator.init.object) === arrayText

    if (isElementVariableDeclaration) {
        return declaration
    }
    return null
}

/**
 * Converts the given node to a replacement fix object.
 *
 * @param {string} replaceText - The replacement text.
 * @param {number} offset - The offset of node's range.
 * @param {ASTNode} node - The node to replace.
 * @returns {Fix} The created fix object.
 */
function convertToFix(replaceText, offset, node) {
    return {
        range: [node.range[0] - offset, node.range[1] - offset],
        text: replaceText,
    }
}

/**
 * Applies the given fixes to the given text.
 *
 * @param {string} originalText - The text to fix.
 * @param {Fix[]} fixes - The fixes to apply.
 * @returns {string} The replaced text.
 */
function applyFixes(originalText, fixes) {
    let text = ""
    let lastPos = 0

    fixes.sort((a, b) => a.range[0] - b.range[0])

    for (const fix of fixes) {
        assert(fix.range[0] >= lastPos)

        text += originalText.slice(lastPos, fix.range[0])
        text += fix.text
        lastPos = fix.range[1]
    }
    text += originalText.slice(lastPos)

    return text
}

/**
 * Fixes the given `Array#forEach` to for-of statement.
 *
 * @param {RuleContext} context - The rule context object.
 * @param {object} callbackInfo - The information of the callback function of
 * `Array#forEach`.
 * @param {RuleFixer} fixer - The fixer to fix.
 * @returns {Fix|null} The created fix object.
 */
function fixArrayForEach(context, callbackInfo, fixer) {
    const sourceCode = context.getSourceCode()
    const funcNode = callbackInfo.node
    const callNode = funcNode.parent
    const calleeNode = callNode.callee
    const returnNodes = callbackInfo.returnNodes
    const thisNodes = callbackInfo.thisNodes
    const contextNode = callbackInfo.contextNode
    const canReplaceAllThis = callbackInfo.canReplaceAllThis

    // Not fix if the callee is multiline.
    if (calleeNode.loc.start.line !== calleeNode.loc.end.line) {
        return null
    }

    // Not fix if thisNodes exist and cannot replace those.
    if (thisNodes.length > 0 && !canReplaceAllThis) {
        return null
    }

    const arrayText = sourceCode.getText(calleeNode.object)
    const elementText = sourceCode.getText(funcNode.params[0])
    const originalBodyText = sourceCode.getText(funcNode.body)
    const contextText = contextNode && sourceCode.getText(contextNode)
    const semiText = funcNode.body.type !== "BlockStatement" ? ";" : ""
    const bodyOffset = funcNode.body.range[0]
    const bodyFixes = [].concat(
        returnNodes.map(convertToFix.bind(null, "continue;", bodyOffset)),
        thisNodes.map(convertToFix.bind(null, contextText, bodyOffset)),
    )
    const bodyText =
        bodyFixes.length > 0
            ? applyFixes(originalBodyText, bodyFixes)
            : originalBodyText

    return fixer.replaceText(
        callNode.parent,
        `for (let ${elementText} of ${arrayText}) ${bodyText}${semiText}`,
    )
}

/**
 * Fixes the given `for` loop statement to for-of statement.
 *
 * @param {RuleContext} context - The rule context object.
 * @param {ASTNode} node - The `for` loop statement to fix.
 * @param {RuleFixer} fixer - The fixer to fix.
 * @returns {Fix|null} The created fix object.
 */
function fixForStatement(context, node, fixer) {
    const sourceCode = context.getSourceCode()
    const element = getElementVariableDeclaration(sourceCode, node)

    // Cannot fix if element name is unknown.
    if (element == null || !isLengthVarOnlyUsedToTest(context, node)) {
        return null
    }

    const arrayText = getArrayTextOfForStatement(sourceCode, node)
    const elementText = sourceCode.getText(element.declarations[0].id)

    return fixer.replaceTextRange(
        [node.range[0], element.range[1]],
        `for (let ${elementText} of ${arrayText}) {`,
    )
}

module.exports = {
    meta: {
        docs: {
            description: "requires for-of statements instead of Array#forEach",
            category: "Best Practices",
            recommended: false,
            url: "https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/docs/rules/my-prefer-for-of.md",
        },
        fixable: "code",
        schema: [],
        type: "suggestion",
    },
    create(context) {
        let funcInfo = null

        /**
         * Processes to enter a function.
         * Push new information object to the function stack.
         *
         * @param {ASTNode} node - The function node which is entered.
         * @returns {void}
         */
        function enterFunction(node) {
            const isTarget =
                isCallbackOfArrayForEach(node) &&
                isValidParams(node) &&
                !isCalledRecursively(context, node)
            const contextNode = isTarget ? getContextNode(node) : null
            const contextVar =
                contextNode && getContextVariable(context, contextNode)

            funcInfo = {
                upper: funcInfo,
                isTarget,
                node,
                contextNode,
                contextVar,
                returnNodes: [],
                thisNodes: [],
                canReplaceAllThis: contextVar != null,
            }
        }

        /**
         * Processes to exit a function.
         * Pop the last item of the function stack and report it.
         *
         * @param {ASTNode} node - The function node which is exited.
         * @returns {void}
         */
        function exitFunction() {
            if (funcInfo.isTarget) {
                const expressionStatementNode = funcInfo.node.parent.parent
                context.report({
                    node: expressionStatementNode,
                    message: MESSAGE,
                    fix: fixArrayForEach.bind(null, context, funcInfo),
                })
            }
            funcInfo = funcInfo.upper
        }

        return {
            ArrowFunctionExpression: enterFunction,
            FunctionExpression: enterFunction,
            FunctionDeclaration: enterFunction,
            "ArrowFunctionExpression:exit": exitFunction,
            "FunctionExpression:exit": exitFunction,
            "FunctionDeclaration:exit": exitFunction,

            ReturnStatement(node) {
                if (funcInfo != null && funcInfo.isTarget) {
                    funcInfo.returnNodes.push(node)
                }
            },

            ThisExpression(node) {
                let thisFuncInfo = funcInfo
                while (
                    thisFuncInfo != null &&
                    thisFuncInfo.node.type === "ArrowFunctionExpression"
                ) {
                    thisFuncInfo = thisFuncInfo.upper
                }

                if (
                    thisFuncInfo != null &&
                    thisFuncInfo.isTarget &&
                    !thisFuncInfo.returnNodes.some((returnNode) =>
                        contains(returnNode, node),
                    )
                ) {
                    thisFuncInfo.thisNodes.push(node)

                    // If it replaced this by the context variable name,
                    // verify whether the reference gets the context variable or not.
                    if (thisFuncInfo.canReplaceAllThis) {
                        if (thisFuncInfo.contextVar != null) {
                            const variable = getVariableByName(
                                context,
                                thisFuncInfo.contextVar.name,
                            )

                            thisFuncInfo.canReplaceAllThis =
                                variable === thisFuncInfo.contextVar
                        }
                    }
                }
            },

            "ForStatement:exit"(node) {
                if (
                    isTraversingArray(node) &&
                    isIndexVarOnlyUsedToGetArrayElements(context, node)
                ) {
                    context.report({
                        node,
                        message: MESSAGE,
                        fix: fixForStatement.bind(null, context, node),
                    })
                }
            },

            ForInStatement(node) {
                context.report({ node, message: MESSAGE })
            },
        }
    },
}
