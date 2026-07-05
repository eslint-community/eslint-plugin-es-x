import type { RuleDefinition } from "@eslint/core"
import type { JSSyntaxElement, Linter, Rule, SourceCode } from "eslint"

interface EsXRuleDocs {
    description: string
    category?: string
    proposal?: string
    recommended: boolean
    url: string
}

type EsXRuleModule<
    RuleOptions extends unknown[],
    MessageIds extends string,
> = RuleDefinition<{
    LangOptions: Linter.LanguageOptions
    Code: SourceCode
    RuleOptions: RuleOptions
    Visitor: Rule.RuleListener
    Node: JSSyntaxElement
    MessageIds: MessageIds
    ExtRuleDocs: EsXRuleDocs
}>

/**
 * Define the rule.
 * @param rule rule module
 * @returns The rule module.
 */
export function createRule<
    MessageIds extends string,
    RuleOptions extends unknown[] = any[],
>(
    rule: EsXRuleModule<RuleOptions, MessageIds>,
): EsXRuleModule<RuleOptions, MessageIds> {
    return rule
}
