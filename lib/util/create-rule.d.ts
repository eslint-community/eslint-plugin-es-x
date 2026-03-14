import type { RuleDefinition } from "@eslint/core"
import type { JSSyntaxElement, Linter, Rule, SourceCode } from "eslint"

interface EsXRuleDocs<Desc extends string> {
    description: Desc
    category?: string
    proposal?: string
    recommended: boolean
    url: string
}

type EsXRuleModule<
    RuleOptions extends unknown[],
    MessageIds extends string,
    Docs extends EsXRuleDocs<string>,
> = RuleDefinition<{
    LangOptions: Linter.LanguageOptions
    Code: SourceCode
    RuleOptions: RuleOptions
    Visitor: Rule.RuleListener
    Node: JSSyntaxElement
    MessageIds: MessageIds
    ExtRuleDocs: Docs
}>

/**
 * Define the rule.
 * @param rule rule module
 */
export function createRule<
    MessageIds extends string,
    Desc extends string,
    Docs extends EsXRuleDocs<Desc>,
    RuleOptions extends unknown[] = any[],
>(
    rule: EsXRuleModule<RuleOptions, MessageIds, Docs>,
): EsXRuleModule<RuleOptions, MessageIds, Docs>
