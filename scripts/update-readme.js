/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const libRoot = path.resolve("./lib/rules")
const categories = {
    ES2018: { rules: [] },
    ES2017: { rules: [] },
    ES2016: { rules: [] },
    ES2015: { rules: [] },
    ES5: { rules: [] },
}

for (const filename of fs.readdirSync(libRoot)) {
    const ruleId = path.basename(filename, ".js")
    const filePath = path.join(libRoot, filename)
    const content = fs.readFileSync(filePath, "utf8")
    const category = /category:[^"]+"(.+)"/.exec(content)[1]
    const description = /description:[^"]+"(.+)"/.exec(content)[1]

    categories[category].rules.push({ ruleId, description })
}

const ruleSectionContent = Object.keys(categories)
    .map(toSection)
    .join("\n")
const currentReadmeContent = fs.readFileSync("README.md", "utf8")
const newReadmeContent = currentReadmeContent.replace(
    /<!--RULE_TABLE_BEGIN-->[\s\S]*<!--RULE_TABLE_END-->/,
    `<!--RULE_TABLE_BEGIN-->\n${ruleSectionContent}\n<!--RULE_TABLE_END-->`
)

fs.writeFileSync("README.md", newReadmeContent)

function toSection(categoryId) {
    return `#### ${categoryId}

${toTable(categories[categoryId])}
`
}

function toTable({ rules }) {
    return `| Rule ID | Description |
|:--------|:------------|
${rules.map(toTableRow).join("\n")}`
}

function toTableRow({ ruleId, description }) {
    return `| [es/${ruleId}](docs/rules/${ruleId}.md) | ${description} |`
}
