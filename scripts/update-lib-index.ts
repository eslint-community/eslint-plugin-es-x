/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import * as fs from "node:fs"
import * as path from "node:path"
import { ESLint } from "eslint"
import { rules } from "./rules"

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
 * This file was generated automatically by 'scripts/update-lib-index.ts'.
 * It is a development shim so that require("./index.js") resolves correctly
 * when running under tsx. It is excluded from the tsc build; consumers use
 * dist/index.js which is compiled directly from lib/index.ts.
 */
"use strict"

module.exports = require("./index.ts")
`,
)

fs.writeFileSync(
    "lib/index.ts",
    `/**
 * DON'T EDIT THIS FILE.
 * This file was generated automatically by 'scripts/update-lib-index.ts'.
 */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Linter, Rule } from "eslint"

const { printWarningOfDeprecatedConfig } = require("./utils") as {
    printWarningOfDeprecatedConfig: (id: string) => void
}
const { version, name } = require("../package.json") as {
    version: string
    name: string
}

const plugin: {
    meta: { name: string; version: string }
    configs: {
        ${flatConfigIds.map((id) => `"flat/${id}": Linter.Config`).join("\n        ")}
        ${configIds.map((id) => `"${id}": Linter.LegacyConfig`).join("\n        ")}
        ${legacyConfigIds.map((id) => `readonly "${id}": Linter.LegacyConfig`).join("\n        ")}
    }
    rules: Record<string, Rule.RuleModule>
} = {
    meta: { version, name },
    configs: {
        ${flatConfigIds
            .map((id) => `"flat/${id}": require("./configs/flat/${id}")`)
            .join(",\n        ")},
        ${configIds
            .map((id) => `"${id}": require("./configs/${id}")`)
            .join(",\n        ")},
        ${legacyConfigIds
            .map(
                (id) => `get "${id}"() {
            printWarningOfDeprecatedConfig("${id}")
            return require("./configs/${id.replace("no-", "no-new-in-es")}") as Linter.LegacyConfig
        }`,
            )
            .join(",\n        ")},
    },
    rules: {
        ${ruleIds.map((id) => `"${id}": require("./rules/${id}")`).join(",\n        ")},
    },
}

export = plugin
/* eslint-enable @typescript-eslint/no-require-imports */
`,
)

format()

async function format() {
    ESLint.outputFixes(
        await new ESLint({ fix: true }).lintFiles(["lib/index.ts"]),
    )
}
