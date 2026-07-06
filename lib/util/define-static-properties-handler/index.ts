import { READ, ReferenceTracker } from "@eslint-community/eslint-utils"
import type { Rule } from "eslint"
import type { TSESTree } from "@typescript-eslint/types"

import {
    type ClassPropertyTypeMap,
    createPropertyGuardsContext,
    type Params,
} from "../type-checker/property-guards.ts"

type TraceMap = Parameters<ReferenceTracker["iterateGlobalReferences"]>[0]
type TraceMapObject = TraceMap[string]

/**
 * Define handlers to disallow static properties.
 * @param context The rule context.
 * @param propertyTypeMap The property names to disallow. The key is class names and that value is properties and types.
 * @returns The defined handlers.
 */
export function defineStaticPropertiesHandler(
    context: Rule.RuleContext,
    propertyTypeMap: ClassPropertyTypeMap,
): Rule.RuleListener {
    const sourceCode = context.sourceCode

    const guardsContext = createPropertyGuardsContext({
        context,
        propertyTypeMap,
    })
    return {
        "Program:exit"(program) {
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
            const traceMap: TraceMap = {}
            for (const [className, properties] of Object.entries(
                propertyTypeMap,
            )) {
                let map: TraceMapObject = traceMap
                for (const name of className.split(".")) {
                    map = map[name] ??= {}
                }
                for (const propertyName of Object.keys(properties)) {
                    map[propertyName] = { [READ]: true }
                }
            }
            for (const { node, path } of tracker.iterateGlobalReferences(
                traceMap,
            )) {
                const params: Params = {
                    node: node as TSESTree.MemberExpression | TSESTree.Property,
                    className: path.slice(0, -1).join("."),
                    propertyName: path.at(-1),
                    objectNode: getObjectNode(
                        node as TSESTree.MemberExpression | TSESTree.Property,
                    ),
                }
                if (
                    !params.objectNode ||
                    (!guardsContext.processGuard(params) &&
                        !guardsContext.isAvailableLocation(params))
                ) {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: { name: path.join(".") },
                    })
                }
            }
            for (const unused of guardsContext.iterateUnusedGuards()) {
                context.report({
                    node: unused.node,
                    messageId: "forbidden",
                    data: {
                        name: `${unused.className}.${unused.propertyName}`,
                    },
                })
            }
        },
    }
}

/**
 * @param node The node to get.
 * @returns The object node.
 */
function getObjectNode(
    node: TSESTree.MemberExpression | TSESTree.Property,
): TSESTree.Expression | null | undefined {
    if (node.type === "MemberExpression") {
        return node.object as TSESTree.Expression
    }
    if (
        node.type === "Property" &&
        node.parent?.type === "ObjectPattern" &&
        node.parent.parent
    ) {
        if (node.parent.parent.type === "VariableDeclarator") {
            return node.parent.parent.init
        }
        if (node.parent.parent.type === "AssignmentPattern") {
            return node.parent.parent.right
        }
        if (node.parent.parent.type === "AssignmentExpression") {
            return node.parent.parent.right
        }
    }
    return null
}
