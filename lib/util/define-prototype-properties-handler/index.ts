import { getPropertyName } from "@eslint-community/eslint-utils"
import { buildTypeChecker, type TypeName } from "eslint-type-tracer"
import type { Rule } from "eslint"
import type { TSESTree } from "@typescript-eslint/types"
import type * as ESTree from "estree"

import {
    createPropertyGuardsContext,
    type Params,
    type PropertyTypeMap,
} from "../type-checker/property-guards"

type CreateReportArgument = {
    objectTypeResult: true | "aggressive"
    className: string
    propertyName: string
    node: TSESTree.MemberExpression | TSESTree.Property
}
type Options = {
    createReport?: (
        arg: CreateReportArgument,
    ) => Partial<Rule.ReportDescriptor> | null
}

/**
 * Define handlers to disallow prototype properties.
 * @param context The rule context.
 * @param propertyTypeMap The property names to disallow. The key is class names and that value is properties and types.
 * @param options The options.
 * @param options.createReport The function to create the report descriptor.
 * @returns The defined handlers.
 */
export function definePrototypePropertiesHandler(
    context: Rule.RuleContext,
    propertyTypeMap: Partial<Record<TypeName, PropertyTypeMap>>,
    options?: Options,
): Rule.RuleListener {
    const sourceCode = context.sourceCode
    const aggressiveOption = getAggressiveOption(context)

    const objectTypeChecker = buildTypeChecker(sourceCode, {
        aggressive: aggressiveOption,
    })

    function report(
        node: TSESTree.MemberExpression | TSESTree.Property,
        className: string,
        propertyName: string,
        objectTypeResult: true | "aggressive",
    ): void {
        context.report({
            node,
            messageId: "forbidden",
            data: {
                name: `${className}.prototype.${propertyName}`,
            },
            ...(options?.createReport?.({
                objectTypeResult,
                className,
                propertyName,
                node,
            }) ?? {}),
        })
    }

    const guardsContext = createPropertyGuardsContext({
        context,
        propertyTypeMap,
    })

    const propertyEntries = (
        Object.entries(propertyTypeMap) as [TypeName, PropertyTypeMap][]
    ).map(
        ([className, properties]) =>
            [className, Object.keys(properties)] as const,
    )

    /**
     * @param node The node to verify.
     * @param className The class name to verify.
     * @param propertyName The property name to verify.
     * @param objectNode The object node to verify.
     * @returns `true` if the class property name is verified.
     */
    function verifyClassPropertyName(
        node: TSESTree.MemberExpression | TSESTree.Property,
        className: TypeName,
        propertyName: string,
        objectNode: TSESTree.Expression,
    ): boolean {
        const objectTypeResult = objectTypeChecker(objectNode, className, node)
        if (!objectTypeResult) {
            return false
        }

        const params: Params = {
            node,
            className,
            propertyName,
            objectNode,
            objectTypeResult,
        }
        if (
            !guardsContext.processGuard(params) &&
            !guardsContext.isAvailableLocation(params)
        ) {
            report(node, className, propertyName, objectTypeResult)
        }
        return true
    }

    /**
     * @param node The node to verify.
     * @param propertyName The property name to verify.
     * @param objectNode The object node to verify.
     * @returns void
     */
    // eslint-disable-next-line func-style
    let verifyPropertyName = (
        node: TSESTree.MemberExpression | TSESTree.Property,
        propertyName: string,
        objectNode: TSESTree.Expression,
    ): void => {
        for (const [className, properties] of propertyEntries) {
            if (!properties.includes(propertyName)) {
                continue
            }
            if (
                verifyClassPropertyName(
                    node,
                    className,
                    propertyName,
                    objectNode,
                )
            ) {
                return
            }
        }
    }
    if (propertyEntries.length === 1) {
        // For performance
        const [[className, properties]] = propertyEntries
        verifyPropertyName = (node, propertyName, objectNode) => {
            if (!properties.includes(propertyName)) {
                return
            }
            verifyClassPropertyName(node, className, propertyName, objectNode)
        }
    }

    return {
        MemberExpression(node) {
            const propertyName = getPropertyName(
                node,
                sourceCode.getScope(node),
            )
            if (propertyName == null) {
                return
            }
            verifyPropertyName(
                node as TSESTree.MemberExpression,
                propertyName,
                node.object as TSESTree.Expression,
            )
        },
        [[
            "VariableDeclarator > ObjectPattern.id > Property.properties",
            "AssignmentExpression > ObjectPattern.left > Property.properties",
            "AssignmentPattern > ObjectPattern.left > Property.properties",
        ].join(",")](node: ESTree.Property) {
            const propertyName = getPropertyName(
                node,
                sourceCode.getScope(node),
            )
            if (propertyName == null) {
                return
            }
            const assignmentNode = (node as TSESTree.Node).parent.parent as
                | TSESTree.VariableDeclarator
                | TSESTree.AssignmentExpression
                | TSESTree.AssignmentPattern
            const objectNode =
                assignmentNode.type === "VariableDeclarator"
                    ? assignmentNode.init
                    : assignmentNode.right
            if (!objectNode) {
                return
            }
            verifyPropertyName(
                node as TSESTree.Property,
                propertyName,
                objectNode,
            )
        },
        "Program:exit"() {
            for (const unused of guardsContext.iterateUnusedGuards()) {
                report(
                    unused.node,
                    unused.className,
                    unused.propertyName,
                    unused.objectTypeResult,
                )
            }
        },
    }
}

/**
 * Get `aggressive` option value.
 * @param context The rule context.
 * @returns The gotten `aggressive` option value.
 */
function getAggressiveOption(context: Rule.RuleContext): boolean {
    const options = context.options[0]
    const globalOptions = context.settings["es-x"] as
        | { aggressive?: unknown }
        | undefined

    if (options && typeof options.aggressive === "boolean") {
        return options.aggressive
    }
    if (globalOptions && typeof globalOptions.aggressive === "boolean") {
        return globalOptions.aggressive
    }

    return false
}
