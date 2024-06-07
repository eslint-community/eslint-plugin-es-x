/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const { categories } = require("./rules")
const collator = new Intl.Collator("en", { numeric: true })

const links = new Set()
const configs = []
// Analyze configs
for (const {
    rules,
    edition,
    configName,
    aboveConfigName,
    specKind,
    id,
} of Object.values(categories).filter(
    (category) => category.specKind !== "proposal",
)) {
    if (configName) {
        configs.push({ id: configName, categoryIds: [id] })
        if (rules.length) {
            links.add(`[\`${configName}\`]: ../configs/index.md#${configName}`)
        }
    }
    if (aboveConfigName) {
        const includesCategories = Object.values(categories).filter(
            (c) =>
                c.edition >= edition &&
                c.specKind === specKind &&
                !c.experimental &&
                c.configName,
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
 * @param {import("./rules").Category} category The category to convert.
 */
function toSection(category) {
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
                ? `There are multiple configs that enable all rules in this category: ${formatList(
                      configIds,
                  )}`
                : `There is a config that enables the rules in this category: ${formatList(
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
 * @param {import("./rules").Category} category The category information to convert.
 */
function toTable({ rules, id }) {
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
 * @param {import("./rules").Rule} rule The rule information to convert.
 */
function toTableRow({ ruleId, description, fixable }) {
    const icons = fixable ? "🔧" : ""
    return `| ${toRuleLink(ruleId)} | ${description}. | ${icons} |`
}

/**
 * Create markdown text for rule link.
 * @param {string} ruleId The rule id to convert.
 */
function toRuleLink(ruleId) {
    return `[es-x/${ruleId}](./${ruleId}.md)`
}

/**
 * Format a list.
 * @param {string[]} xs The list value to format.
 */
function formatList(xs) {
    switch (xs.length) {
        case 0:
            return ""
        case 1:
            return xs[0]
        case 2:
            return `${xs[0]} and ${xs[1]}`
        default: {
            const ys = xs.slice(0, xs.length - 1)
            const last = xs[xs.length - 1]
            return `${ys.join(", ")}, and ${last}`
        }
    }
}
