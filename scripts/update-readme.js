/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const { categories } = require("./rules")

const ruleSectionContent = Object.keys(categories)
    .map(toSection)
    .join("\n")
const currentReadmeContent = fs.readFileSync("README.md", "utf8")
const newReadmeContent = currentReadmeContent.replace(
    /<!--RULE_TABLE_BEGIN-->[\s\S]*<!--RULE_TABLE_END-->/,
    `<!--RULE_TABLE_BEGIN-->\n${ruleSectionContent}\n<!--RULE_TABLE_END-->`
)

fs.writeFileSync("README.md", newReadmeContent)

//------------------------------------------------------------------------------

function toSection(categoryId) {
    return `#### ${categoryId}

${toTable(categories[categoryId])}
`
}

function toTable({ rules }) {
    return `| Rule ID | Description |    |
|:--------|:------------|:--:|
${rules.map(toTableRow).join("\n")}`
}

function toTableRow({ ruleId, description, fixable }) {
    const title = `[es/${ruleId}](docs/rules/${ruleId}.md)`
    const icons = fixable ? "🔧" : ""
    return `| ${title} | ${description}. | ${icons} |`
}
