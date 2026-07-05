import { READ, ReferenceTracker } from "@eslint-community/eslint-utils"
import type { Rule } from "eslint"
import type { TSESTree } from "@typescript-eslint/types"

import { getPropertyKeyValue } from "../get-property-key-value"
import {
    createPropertyGuardsContext,
    type Params,
} from "../type-checker/property-guards"
import { BuiltinGlobalObjectName, GlobalObjectProperties } from "../types"

type GlobalObjectWithProperties<N extends BuiltinGlobalObjectName> =
    `${N}.${GlobalObjectProperties<N>}`
type GlobalStaticPropertyNames =
    | BuiltinGlobalObjectName
    | GlobalObjectWithProperties<"Temporal" | "Intl">

type NameMap = Partial<Record<GlobalStaticPropertyNames, Iterable<string>>>
type TraceMap = Parameters<ReferenceTracker["iterateGlobalReferences"]>[0]
type TraceMapObject = TraceMap[string]

/**
 * Define handlers to disallow non-standard static global object properties.
 * @param context The rule context.
 * @param nameMap The property names to allow. The key is class names and that value is property names.
 * @returns The defined handlers.
 */
export function defineNonstandardStaticPropertiesHandler(
    context: Rule.RuleContext,
    nameMap: NameMap,
): Rule.RuleListener {
    const nameMapEntries = (
        Object.entries(nameMap) as [
            GlobalStaticPropertyNames,
            Iterable<string>,
        ][]
    ).map(
        ([className, propertyNames]) =>
            [className, new Set(propertyNames)] as const,
    )
    const sourceCode = context.sourceCode

    const guardsContext = createPropertyGuardsContext({ context })

    function report(
        node: TSESTree.MemberExpression | TSESTree.Property,
        path: string[],
        propertyName: string,
    ): void {
        context.report({
            node,
            messageId: "forbidden",
            data: { name: [...path, propertyName].join(".") },
        })
    }

    /**
     * @param node The node to report.
     * @param path The reference path.
     * @param propertyName The property name to report.
     * @param objectNode The object node to verify.
     * @returns void
     */
    function reportOrProcessGuard(
        node: TSESTree.MemberExpression | TSESTree.Property,
        path: string[],
        propertyName: string,
        objectNode: TSESTree.Expression,
    ): void {
        const params: Params = {
            node,
            className: path.join("."),
            propertyName,
            objectNode,
        }
        if (
            !guardsContext.processGuard(params) &&
            !guardsContext.isAvailableLocation(params)
        ) {
            report(node, path, propertyName)
        }
    }

    /**
     * @param tracker The reference tracker.
     * @param traceMap The trace map.
     * @param propertyNames The property names to allow.
     * @returns void
     */
    function verifyForEntry(
        tracker: ReferenceTracker,
        traceMap: TraceMap,
        propertyNames: Set<string>,
    ): void {
        /**
         * @param node The object pattern node.
         * @returns The non-standard properties.
         */
        function* extractNonstandardProperties(
            node: TSESTree.ObjectPattern,
        ): IterableIterator<{
            node: TSESTree.Property
            propertyName: string
        }> {
            for (const prop of node.properties) {
                if (prop.type !== "Property") {
                    continue
                }
                const propertyName = getPropertyKeyValue(
                    prop,
                    sourceCode.getScope(node as Rule.Node),
                )
                if (
                    // If the key is a symbol, it is ignored.
                    typeof propertyName !== "string" ||
                    propertyNames.has(propertyName)
                ) {
                    continue
                }
                yield { node: prop, propertyName }
            }
        }

        for (const { node, path } of tracker.iterateGlobalReferences(
            traceMap,
        )) {
            const parent = node.parent as TSESTree.Node | null
            if (!parent) {
                continue
            }
            if (parent.type === "MemberExpression") {
                if (parent.object !== node) {
                    continue
                }
                const propertyName = getPropertyKeyValue(
                    parent,
                    sourceCode.getScope(node),
                )
                if (
                    // If the key is a symbol, it is ignored.
                    typeof propertyName !== "string" ||
                    propertyNames.has(propertyName)
                ) {
                    continue
                }
                reportOrProcessGuard(
                    parent,
                    path,
                    propertyName,
                    node as TSESTree.Expression,
                )
            } else if (parent.type === "VariableDeclarator") {
                if (
                    parent.init !== node ||
                    parent.id.type !== "ObjectPattern"
                ) {
                    continue
                }
                for (const {
                    node: reportNode,
                    propertyName,
                } of extractNonstandardProperties(parent.id)) {
                    reportOrProcessGuard(
                        reportNode,
                        path,
                        propertyName,
                        node as TSESTree.Expression,
                    )
                }
            } else if (
                parent.type === "AssignmentExpression" ||
                parent.type === "AssignmentPattern"
            ) {
                if (
                    parent.right !== node ||
                    parent.left.type !== "ObjectPattern"
                ) {
                    continue
                }
                for (const {
                    node: reportNode,
                    propertyName,
                } of extractNonstandardProperties(parent.left)) {
                    reportOrProcessGuard(
                        reportNode,
                        path,
                        propertyName,
                        node as TSESTree.Expression,
                    )
                }
            } else {
                continue
            }
        }
    }

    return {
        "Program:exit"(program) {
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
            for (const [className, propertyNames] of nameMapEntries) {
                const traceMap: TraceMap = {}
                let map: TraceMapObject = traceMap
                for (const name of className.split(".")) {
                    map = map[name] || (map[name] = {})
                }
                map[READ] = true
                verifyForEntry(tracker, traceMap, new Set(propertyNames))
            }
            for (const unused of guardsContext.iterateUnusedGuards()) {
                report(unused.node, [unused.className], unused.propertyName)
            }
        },
    }
}
