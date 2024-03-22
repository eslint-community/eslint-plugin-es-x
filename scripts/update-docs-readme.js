/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const { categories } = require("./rules")
const collator = new Intl.Collator("en", { numeric: true })

const links = []
const configs = []
// Analyze configs
for (const {
    rules,
    edition,
    configName,
    aboveConfigName,
    specKind,
    id,
} of Object.values(categories)) {
    if (configName) {
        configs.push({ id: configName, categoryIds: [id] })
        if (rules.length) {
            links.push(`[\`${configName}\`]: ../configs/index.md#${configName}`)
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
        links.push(
            `[\`${aboveConfigName}\`]: ../configs/index.md#${aboveConfigName}`,
        )
    }
}

// Convert categories to README sections
const ruleSectionContent = Object.values(categories)
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
${links.join("\n")}
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

    let comment = ""
    if (category.comment) {
        comment = `${category.comment} \\\n`
    }
    comment += !configIds.length
        ? "Rules in this category are not included in any preset."
        : configIds.length > 1
          ? `There are multiple configs that enable all rules in this category: ${formatList(
                configIds,
            )}`
          : `There is a config that enables the rules in this category: ${formatList(
                configIds,
            )}`

    return `## ${category.title}

${comment}

${toTable(category)}
`
}

/**
 * Create markdown text for a category.
 * @param {import("./rules").Category} category The category information to convert.
 */
function toTable({ rules }) {
    const body = rules.map(toTableRow).join("\n")
    return `| Rule ID | Description |    |
|:--------|:------------|:--:|
${body.trim() ? body : "|  | Now there are no rules. |  |"}`
}

/**
 * Create markdown text for a rule.
 * @param {import("./rules").Rule} rule The rule information to convert.
 */
function toTableRow({ ruleId, description, fixable }) {
    const title = `[es-x/${ruleId}](./${ruleId}.md)`
    const icons = fixable ? "🔧" : ""
    return `| ${title} | ${description}. | ${icons} |`
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
