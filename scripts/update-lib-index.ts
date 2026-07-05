/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import * as fs from "node:fs"
import * as path from "node:path"
import { ESLint } from "eslint"
import { rules } from "./rules"

const collator = new Intl.Collator("en", { numeric: true })

const flatConfigRootPath = path.resolve(__dirname, "../lib/configs/flat")
const configIds = getConfigIds(flatConfigRootPath)
const ruleIds = rules.map((r) => r.ruleId).sort(collator.compare.bind(collator))

fs.writeFileSync(
    "lib/index.ts",
    `/**
 * DON'T EDIT THIS FILE.
 * This file was generated automatically by 'scripts/update-lib-index.ts'.
 */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Linter, Rule } from "eslint"

const { version, name } = require("../package.json") as {
    version: string
    name: string
}

const plugin: {
    meta: { name: string; version: string }
    configs: {
        ${configIds.map((id) => `"${id}": Linter.Config`).join("\n        ")}
        ${configIds.map((id) => `"flat/${id}": Linter.Config`).join("\n        ")}
    }
    rules: Record<string, Rule.RuleModule>
} = {
    meta: { version, name },
    configs: {
        ${configIds
            .map((id) => `"${id}": require("./configs/flat/${id}")`)
            .join(",\n        ")},
        ${configIds
            .map((id) => `"flat/${id}": require("./configs/flat/${id}")`)
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
    await ESLint.outputFixes(
        await new ESLint({ fix: true }).lintFiles(["lib/index.ts"]),
    )
}

function getConfigIds(rootPath: string) {
    return fs
        .globSync("*.js", { cwd: rootPath })
        .map((f) => path.basename(f, ".js"))
        .sort(collator.compare.bind(collator))
}
