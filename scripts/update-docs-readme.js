/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const { categories } = require("./rules")
const collator = new Intl.Collator("en", { numeric: true })
const conjunction = new Intl.ListFormat("en", { type: "conjunction" })

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
`
)

//------------------------------------------------------------------------------

function extractCategoryId(filePath) {
    const basename = path.basename(filePath, ".js")
    const match = /no-new-in-(es\d+)/u.exec(basename)
    return match ? match[1].toUpperCase() : undefined
}

function toSection(categoryId) {
    const configIds = conjunction.format(
        configs
            .filter(c => c.categoryIds.includes(categoryId))
            .map(c => `\`${c.id}\``)
            .sort(collator.compare.bind(collator))
    )
    const comment = configIds
        ? `There are multiple configs which enable all rules in this category: ${configIds}`
        : "There is no config which enables the rules in this category."

    return `## ${categoryId}

${comment}

${toTable(categories[categoryId])}
`
}

function toTable({ rules }) {
    return `| Rule ID | Description |    |
|:--------|:------------|:--:|
${rules.map(toTableRow).join("\n")}`
}

function toTableRow({ ruleId, description, fixable }) {
    const title = `[es/${ruleId}](./${ruleId}.md)`
    const icons = fixable ? "🔧" : ""
    return `| ${title} | ${description}. | ${icons} |`
}
