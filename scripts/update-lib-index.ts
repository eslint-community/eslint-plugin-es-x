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
import { name, version } from "./meta"
import type { Linter, Rule } from "eslint"
${configIds.map((id) => `import ${getConfigIdentifier(id)} from "./configs/flat/${id}"`).join("\n")}
${ruleIds.map((id) => `import ${getRuleIdentifier(id)} from "./rules/${id}"`).join("\n")}

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
            .map((id) => `"${id}": ${getConfigIdentifier(id)}`)
            .join(",\n        ")},
        ${configIds
            .map((id) => `"flat/${id}": ${getConfigIdentifier(id)}`)
            .join(",\n        ")},
    },
    rules: {
        ${ruleIds.map((id) => `"${id}": ${getRuleIdentifier(id)}`).join(",\n        ")},
    },
}

export default plugin
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
        .globSync("*.ts", { cwd: rootPath })
        .map((f) => path.basename(f, ".ts"))
        .sort(collator.compare.bind(collator))
}

function getConfigIdentifier(configId: string) {
    return `${getIdentifier(configId)}Config`
}

function getRuleIdentifier(ruleId: string) {
    return `${getIdentifier(ruleId)}Rule`
}

function getIdentifier(id: string) {
    const parts = id.split(/\W+/u).filter(Boolean)
    return `${parts[0]}${parts
        .slice(1)
        .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
        .join("")}`
}
