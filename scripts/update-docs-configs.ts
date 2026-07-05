/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
import * as fs from "node:fs"
import * as path from "node:path"
import { getConfigCategories, type Category } from "./rules"

const MD_PATH = path.resolve(__dirname, "../docs/configs/index.md")
const listFormatter = new Intl.ListFormat("en", { type: "conjunction" })

const contents = [
    "# Available Configs",
    "",
    "This plugin provides the following flat configs.",
    "",
    "The `flat/`-prefixed config IDs are kept as aliases for the previous flat config names.",
    "",
]

const configs = getConfigCategories()

configs
    .filter((cat) => cat.specKind !== "proposal")
    .forEach(processCategoryConfig)

for (const { title, aboveConfigName, specKind } of configs) {
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

configs
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

fs.writeFileSync(MD_PATH, `${contents.join("\n").trim()}\n`)

/**
 * Process for normal category config
 */
function processCategoryConfig({
    title,
    rules,
    configName,
    specKind,
    experimental,
}: Category) {
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
            `This config includes the rules ${listFormatter.format(
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

function appendConfig(configName: string) {
    contents.push("```js")
    contents.push(`import { defineConfig } from "eslint/config"
import pluginESx from "eslint-plugin-es-x"

export default defineConfig([
    pluginESx.configs["${configName}"]
])`)
    contents.push("```")
    contents.push("")
}
