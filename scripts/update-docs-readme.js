/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const { categories } = require("./rules")
const collator = new Intl.Collator("en", { numeric: true })

// Analyze configs
const configRoot = path.resolve(__dirname, "../lib/configs/")
const configs = fs.readdirSync(configRoot).map((filename) => {
    const id = `plugin:es-x/${path.basename(filename, ".js")}`
    const configFile = path.join(configRoot, filename)
    const categoryIds = [
        extractCategoryId(configFile),
        ...(require(configFile).extends || []).map(extractCategoryId),
    ].filter(Boolean)

    return { id, categoryIds }
})

// Convert categories to README sections
const ruleSectionContent = Object.values(categories)
    .map(toSection)
    .filter((c) => c)
    .join("\n")

// Write README.md
fs.writeFileSync(
    "docs/rules/README.md",
    `# Available Rules

This plugin provides the following rules.

- 🔧 mark means that the \`--fix\` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by the rule.

${ruleSectionContent}
`,
)

//------------------------------------------------------------------------------

function extractCategoryId(filePath) {
    const basename = path.basename(filePath, ".js")
    const match = /no-new-in-(es\d+)/u.exec(basename)
    return match ? match[1].toUpperCase() : undefined
}

/**
 * Create markdown text for a category.
 * @param {import("./rules").Category} category The category to convert.
 */
function toSection(category) {
    if (!category.rules.length) {
        return undefined
    }
    const configIds = formatList(
        configs
            .filter((c) => c.categoryIds.includes(category.id))
            .map((c) => `\`${c.id}\``)
            .sort(collator.compare.bind(collator)),
    )
    const comment =
        category.comment ||
        (configIds
            ? `There are multiple configs that enable all rules in this category: ${configIds}`
            : "There is a config that enables the rules in this category: `plugin:es-x/no-new-in-esnext`")

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
