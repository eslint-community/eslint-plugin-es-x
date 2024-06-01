/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const { categories } = require("./rules")
const MD_PATH = path.resolve(__dirname, "../docs/configs/index.md")

const contents = [
    "# Available Configs",
    "",
    "This plugin provides the following configs.",
    "",
]

/** @type {Record<string, import("./rules").Category>} */
const configs = {}
for (const { configName, rules, ...config } of Object.values(categories)) {
    if (configs[configName]) {
        configs[configName].rules.push(...rules)
    } else {
        configs[configName] = {
            ...config,
            configName,
            rules: [...rules],
        }
    }
}

Object.values(configs)
    .filter(
        (cat, i, list) =>
            cat.specKind !== "proposal" &&
            list.slice(0, i).every((c) => c.configName !== cat.configName),
    )
    .forEach(processCategoryConfig)

for (const { title, aboveConfigName, specKind } of Object.values(configs)) {
    if (!aboveConfigName) {
        continue
    }

    contents.push(`## ${aboveConfigName}`)
    contents.push("")
    contents.push(
        specKind === "ecma262"
            ? `disallow new stuff that ${title} doesn't include`
            : `disallow new stuff that ${title} (ECMA-402) doesn't include`,
    )
    contents.push("")
    appendConfig(aboveConfigName)
}

Object.values(configs)
    .filter((cat) => cat.specKind === "proposal")
    .sort(
        (a, b) =>
            b.year - a.year ||
            (a.configName > b.configName
                ? 1
                : a.configName < b.configName
                  ? -1
                  : 0),
    )
    .forEach(processCategoryConfig)

contents.push(
    "[Config (Flat Config)]: https://eslint.org/docs/latest/use/configure/configuration-files-new",
)
contents.push(
    "[Legacy Config]: https://eslint.org/docs/latest/use/configure/configuration-files",
)

fs.writeFileSync(MD_PATH, `${contents.join("\n").trim()}\n`)

/**
 * Process for normal category config
 * @param {import("./rules").Category} params
 */
function processCategoryConfig({
    title,
    rules,
    configName,
    specKind,
    experimental,
}) {
    if (!configName || !rules.length) {
        return
    }
    contents.push(`## ${configName}`)
    contents.push("")

    if (experimental) {
        contents.push(
            specKind === "ecma262"
                ? "disallow the new stuff to be planned for the next yearly ECMAScript snapshot.\\"
                : specKind === "ecma402"
                  ? "disallow the new stuff to be planned for the next yearly ECMAScript Intl API (ECMA-402) snapshot.\\"
                  : `disallow proposal ${title}\\`,
        )
        contents.push(
            "⚠️ This config will be changed in the minor versions of this plugin.",
        )
    } else {
        contents.push(
            specKind === "ecma262"
                ? `disallow new stuff in ${title}.`
                : specKind === "ecma402"
                  ? `disallow new stuff in ${title} (ECMA-402).`
                  : `disallow proposal ${title}`,
        )
    }

    if (specKind === "proposal") {
        contents.push("")
        contents.push(
            `This configs includes rules for ${formatList(
                rules.map((rule) => {
                    const ruleId = rule.ruleId
                    return `[es-x/${ruleId}](../rules/${ruleId}.md)`
                }),
            )}.`,
        )
    }

    contents.push("")
    appendConfig(configName)
}

function appendConfig(configName) {
    contents.push("### [Config (Flat Config)]")
    contents.push("")
    contents.push("eslint.config.js:")
    contents.push("")
    contents.push("```js")
    contents.push(`import pluginESx from "eslint-plugin-es-x"
export default [
    pluginESx.configs['flat/${configName}']
]`)
    contents.push("```")
    contents.push("")
    contents.push("### [Legacy Config]")
    contents.push("")
    contents.push(".eslintrc.*:")
    contents.push("")
    contents.push("```json")
    contents.push(`{
    "extends": ["plugin:es-x/${configName}"],
}`)
    contents.push("```")
    contents.push("")
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
