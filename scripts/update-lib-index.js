/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const { ESLint } = require("eslint")
const { rules } = require("./rules")
const collator = new Intl.Collator("en", { numeric: true })

const configRootPath = path.resolve(__dirname, "../lib/configs")
const flatConfigRootPath = path.resolve(__dirname, "../lib/configs/flat")
const configIds = fs
    .readdirSync(configRootPath)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.basename(f, ".js"))
    .sort(collator.compare.bind(collator))
const flatConfigIds = fs
    .readdirSync(flatConfigRootPath)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.basename(f, ".js"))
    .sort(collator.compare.bind(collator))
const legacyConfigIds = [
    "no-2019",
    "no-2018",
    "no-2017",
    "no-2016",
    "no-2015",
    "no-5",
].sort(collator.compare.bind(collator))
const ruleIds = rules.map((r) => r.ruleId).sort(collator.compare.bind(collator))

fs.writeFileSync(
    "lib/index.js",
    `/**
 * DON'T EDIT THIS FILE.
 * This file was generated automatically by 'scripts/update-lib-index.js'.
 */
"use strict"

const { printWarningOfDeprecatedConfig } = require("./utils")
const { version, name } = require("../package.json")

const plugin = {
    meta: { version, name },
    configs: {
        ${flatConfigIds
            .map((id) => `"flat/${id}": require("./configs/flat/${id}")`)
            .join(",")},
        ${configIds
            .map((id) => `"${id}":require("./configs/${id}")`)
            .join(",")},
        ${legacyConfigIds
            .map(
                (id) => `get "${id}"() {
                    printWarningOfDeprecatedConfig("${id}")
                    return this["${id.replace("no-", "no-new-in-es")}"]
                }`,
            )
            .join(",")}
    },
    rules: {
        ${ruleIds.map((id) => `"${id}":require("./rules/${id}")`).join(",")}
    },
}

module.exports = plugin
`,
)

format()

async function format() {
    ESLint.outputFixes(
        await new ESLint({ fix: true }).lintFiles(["lib/index.js"]),
    )
}
