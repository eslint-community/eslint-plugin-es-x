import { buildTypeChecker, type TypeName } from "eslint-type-tracer"
import type { Rule } from "eslint"
import type { TSESTree } from "@typescript-eslint/types"
import type * as ESTree from "estree"

import { getPropertyKeyValue } from "../get-property-key-value.ts"
import {
    createPropertyGuardsContext,
    type Params,
} from "../type-checker/property-guards.ts"

type NameMap = Partial<Record<TypeName, Iterable<string>>>
type Options = {
    allowsPropertyName?: (name: string) => boolean
}

/**
 * Define handlers to disallow non-standard prototype properties.
 * @param context The rule context.
 * @param nameMap The property names to allow. The key is class names and that value is property names.
 * @param options The options.
 * @param options.allowsPropertyName The function to check whether the property name is allowed.
 * @returns The defined handlers.
 */
export function defineNonstandardPrototypePropertiesHandler(
    context: Rule.RuleContext,
    nameMap: NameMap,
    options?: Options,
): Rule.RuleListener {
    const sourceCode = context.sourceCode

    const objectTypeChecker = buildTypeChecker(sourceCode)

    const guardsContext = createPropertyGuardsContext({ context })

    const nameMapEntries = (
        Object.entries(nameMap) as [TypeName, Iterable<string>][]
    ).map(
        ([className, propertyNames]) =>
            [className, new Set(propertyNames)] as const,
    )

    function report(
        node: TSESTree.MemberExpression | TSESTree.Property,
        className: string,
        propertyName: string,
    ): void {
        context.report({
            node,
            messageId: "forbidden",
            data: {
                name: `${className}.prototype.${propertyName}`,
            },
        })
    }

    /**
     * @param node The node to report.
     * @param propertyName The property name to verify.
     * @param objectNode The object node to verify.
     * @returns void
     */
    function verifyPropertyName(
        node: TSESTree.MemberExpression | TSESTree.Property,
        propertyName: string,
        objectNode: TSESTree.Expression,
    ): void {
        for (const [className, propertyNames] of nameMapEntries) {
            if (propertyNames.has(propertyName)) {
                continue
            }
            if (!objectTypeChecker(objectNode, className, node)) {
                continue
            }
            const params: Params = {
                node,
                className,
                propertyName,
                objectNode,
            }
            if (
                !guardsContext.processGuard(params) &&
                !guardsContext.isAvailableLocation(params)
            ) {
                report(node, className, propertyName)
            }
            break
        }
    }

    return {
        MemberExpression(node) {
            const propertyName = getPropertyKeyValue(
                node,
                sourceCode.getScope(node),
            )
            if (
                // If the key is a symbol, it is ignored.
                typeof propertyName !== "string" ||
                options?.allowsPropertyName?.(propertyName)
            ) {
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
            const propertyName = getPropertyKeyValue(
                node,
                sourceCode.getScope(node),
            )
            if (
                // If the key is a symbol, it is ignored.
                typeof propertyName !== "string" ||
                options?.allowsPropertyName?.(propertyName)
            ) {
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
                report(unused.node, unused.className, unused.propertyName)
            }
        },
    }
}
