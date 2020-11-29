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
const configs = fs.readdirSync(configRoot).map(filename => {
    const id = `plugin:es/${path.basename(filename, ".js")}`
    const configFile = path.join(configRoot, filename)
    const categoryIds = [
        extractCategoryId(configFile),
        ...(require(configFile).extends || []).map(extractCategoryId),
    ].filter(Boolean)

    return { id, categoryIds }
})

// Convert categories to README sections
const ruleSectionContent = Object.keys(categories)
    .map(toSection)
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
 * @param {string} categoryId The category ID to convert.
 */
function toSection(categoryId) {
    const configIds = formatList(
        configs
            .filter(c => c.categoryIds.includes(categoryId))
            .map(c => `\`${c.id}\``)
            .sort(collator.compare.bind(collator)),
    )
    const comment = configIds
        ? `There are multiple configs that enable all rules in this category: ${configIds}`
        : "There is a config that enables the rules in this category: `plugin:es/no-new-in-esnext`"

    return `## ${categoryId}

${comment}

${toTable(categories[categoryId])}
`
}

/**
 * Create markdown text for a category.
 * @param {import("./rules").Category} category The category information to convert.
 */
function toTable({ rules }) {
    return `| Rule ID | Description |    |
|:--------|:------------|:--:|
${rules.map(toTableRow).join("\n")}`
}

/**
 * Create markdown text for a rule.
 * @param {import("./rules").Rule} rule The rule information to convert.
 */
function toTableRow({ ruleId, description, fixable }) {
    const title = `[es/${ruleId}](./${ruleId}.md)`
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
