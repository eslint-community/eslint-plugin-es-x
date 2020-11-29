/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const { CLIEngine } = require("eslint")
const { rules } = require("./rules")
const { version } = require("../package.json")

const docsRoot = path.resolve(__dirname, "../docs/rules/")
const configRoot = path.resolve(__dirname, "../lib/configs/")
const configs = fs.readdirSync(configRoot).map(filename => {
    const id = `plugin:es/${path.basename(filename, ".js")}`
    const configFile = path.join(configRoot, filename)
    const engine = new CLIEngine({ configFile, useEslintrc: false })
    const config = engine.getConfigForFile("a.js")
    const ruleIds = new Set(Object.keys(config.rules))
    return { id, ruleIds }
})
const collator = new Intl.Collator("en", { numeric: true })

for (const { ruleId, description, fixable } of rules) {
    const filePath = path.join(docsRoot, `${ruleId}.md`)
    const content = fs
        .readFileSync(filePath, "utf8")
        .replace(/^#.+\n>.+\n+(?:- .+\n)*/u, "")
        .replace(/## 📚 References[\s\S]+/u, "")
        .trim()
    const enabledConfigIds = configs
        .filter(c => c.ruleIds.has(`es/${ruleId}`))
        .map(c => `\`${c.id}\``)
        .sort(collator.compare.bind(collator))
    const headerLines = [`# es/${ruleId}`, `> ${description}`, ""]

    if (enabledConfigIds.length > 0) {
        headerLines.push(
            `- ✅ The following configurations enable this rule: ${new Intl.ListFormat(
                "en",
                { type: "conjunction" },
            ).format(enabledConfigIds)}`,
        )
    }
    if (fixable) {
        headerLines.push(
            "- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.",
        )
    }

    const newContent = `${headerLines.join("\n").trim()}

${content}

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v${version}/lib/rules/${ruleId}.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v${version}/tests/lib/rules/${ruleId}.js)
`

    fs.writeFileSync(filePath, newContent)
}
