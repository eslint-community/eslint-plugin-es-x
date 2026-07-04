/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import * as fs from "node:fs"
import {
    categories,
    getConfigCategories,
    getConfigCategoriesForAboveConfig,
    type Category,
    type Rule,
} from "./rules"

const collator = new Intl.Collator("en", { numeric: true })
const listFormatter = new Intl.ListFormat("en", { type: "conjunction" })

const links = new Set<string>()
const configs = []
const configCategories = getConfigCategories()
// Analyze configs
for (const category of Object.values(categories).filter(
    (cat) => cat.specKind !== "proposal",
)) {
    const { rules, configName, aboveConfigName, id } = category
    if (configName) {
        configs.push({ id: configName, categoryIds: [id] })
        if (rules.length) {
            links.add(`[\`${configName}\`]: ../configs/index.md#${configName}`)
        }
    }
    if (aboveConfigName) {
        const includesCategories = getConfigCategoriesForAboveConfig(
            category,
            configCategories,
        )
        configs.push({
            id: aboveConfigName,
            categoryIds: includesCategories.map((c) => c.id),
        })
        links.add(
            `[\`${aboveConfigName}\`]: ../configs/index.md#${aboveConfigName}`,
        )
    }
}

// Convert categories to README sections
const ruleSectionContent = Object.values(categories)
    .filter((category) => category.specKind !== "proposal")
    .map(toSection)
    .filter((c) => c)
    .join("\n")

// Write README.md
fs.writeFileSync(
    "docs/rules/index.md",
    `# Available Rules

This plugin provides the following rules.

- 🔧 mark means that the \`--fix\` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by the rule.

${ruleSectionContent}
${[...links].join("\n")}
`,
)

//------------------------------------------------------------------------------

/**
 * Create markdown text for a category.
 * @param category The category to convert.
 */
function toSection(category: Category) {
    if (!category.rules.length) {
        return undefined
    }
    const configIds = configs
        .filter((c) => c.categoryIds.includes(category.id))
        .map((c) => `[\`${c.id}\`]`)
        .sort(collator.compare.bind(collator))

    /** @type {string[]} */
    const comment = []
    if (category.comment) {
        comment.push(category.comment)
    }
    comment.push(
        category.id === "deprecated"
            ? ""
            : !configIds.length
              ? "Rules in this category are not included in any preset."
              : configIds.length > 1
                ? `There are multiple configs that enable all rules in this category: ${listFormatter.format(
                      configIds,
                  )}`
                : `There is a config that enables the rules in this category: ${listFormatter.format(
                      configIds,
                  )}`,
    )

    return `## ${category.title}

${comment.filter(Boolean).join("\\\n")}

${toTable(category)}
`
}

/**
 * Create markdown text for a category.
 * @param category The category information to convert.
 */
function toTable({ rules, id }: Category) {
    if (id !== "deprecated") {
        const body = rules.map(toTableRow).join("\n")
        return `| Rule ID | Description |    |
|:--------|:------------|:--:|
${body.trim() ? body : "|  | Now there are no rules. |  |"}`
    }
    const body = rules
        .map(
            ({ ruleId, replacedBy }) =>
                `| ${toRuleLink(ruleId)} | ${replacedBy
                    .map(toRuleLink)
                    .join(", ")} |`,
        )
        .join("\n")
    return `| Rule ID | Replaced By |
|:--------|:------------:|
${body.trim() ? body : "|  | Now there are no rules. |"}`
}

/**
 * Create markdown text for a rule.
 * @param rule The rule information to convert.
 */
function toTableRow({ ruleId, description, fixable }: Rule) {
    const icons = fixable ? "🔧" : ""
    return `| ${toRuleLink(ruleId)} | ${description}. | ${icons} |`
}

/**
 * Create markdown text for rule link.
 * @param ruleId The rule id to convert.
 */
function toRuleLink(ruleId: string) {
    return `[es-x/${ruleId}](./${ruleId}.md)`
}
