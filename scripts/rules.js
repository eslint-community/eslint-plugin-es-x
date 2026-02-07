/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const proposals = require("./proposals")
const libRoot = path.resolve(__dirname, "../lib/rules")
const { createRequire } = require("module")

/**
 * @typedef {Object} Rule
 * @property {string} ruleId The rule name.
 * @property {string} description The description.
 * @property {boolean} fixable The fixable flag.
 * @property {boolean} deprecated The deprecated flag.
 * @property {string[]} replacedBy The replacedBy rules.
 * @property {object[]} [schema] The schema.
 */

/**
 * @typedef {Object} Category
 * @property {string} id The category name.
 * @property {string} title The category title.
 * @property {number} [edition] The edition number.
 * @property {number} [year] The year.
 * @property {string} [configName] The config name.
 * @property {string} [aboveConfigName] The config name for disallowing features all above.
 * @property {Rule[]} rules The rules in this category.
 * @property {boolean} [experimental] The flag to be belong to experimental configs.
 * @property {string} [comment] The category comment.
 * @property {"ecma262" | "ecma402" | "proposal"} specKind The specification kind.
 */

// After the ECMAScript specification becomes GA,
// we will need to change this constant and bump the major version.
const LATEST_ES_YEAR = 2026

/** @type {Record<string, Category>} */
const categories = [
    ...(function* () {
        const max = new Date().getFullYear() + 2
        for (let year = max; year >= 2015; year--) {
            yield year
        }
    })(),
    [5, 1],
    [3, null],
]
    .map((esVersion) =>
        Array.isArray(esVersion) ? esVersion : [esVersion, esVersion],
    )
    .reduce((map, versions, index, list) => {
        const [vFor262, vFor402] = versions
        const experimental = vFor262 > LATEST_ES_YEAR
        const [prevVFor262, prevVFor402] = list[index + 1] || [null, null]
        const ecma262Id = `ES${vFor262}`
        if (prevVFor262) {
            map[ecma262Id] = {
                id: ecma262Id,
                title: `ES${vFor262}`,
                edition: vFor262 > 5 ? vFor262 - 2009 : vFor262,
                year: vFor262 > 5 ? vFor262 : vFor262 + 2009,
                rules: [],
                experimental,
                specKind: "ecma262",
                configName: experimental
                    ? "no-new-in-esnext"
                    : `no-new-in-es${vFor262}`,
                aboveConfigName: experimental
                    ? undefined
                    : `restrict-to-es${prevVFor262}`,
            }
        }

        if (vFor402 && prevVFor402) {
            const ecma402Id = `ES${vFor402}-Intl-API`
            map[ecma402Id] = {
                id: ecma402Id,
                title: `ES${vFor402} Intl API`,
                edition: vFor402 > 1 ? vFor402 - 2013 : vFor402,
                year: vFor402 > 1 ? vFor402 : vFor402 + 2013,
                rules: [],
                experimental,
                specKind: "ecma402",
                configName: experimental
                    ? "no-new-in-esnext-intl-api"
                    : `no-new-in-es${vFor402}-intl-api`,
                aboveConfigName: experimental
                    ? undefined
                    : prevVFor402 === 1
                      ? "restrict-to-es-intl-api-1st-edition"
                      : `restrict-to-es${prevVFor402}-intl-api`,
            }
        }
        return map
    }, {})
categories.legacy = {
    id: "legacy",
    title: "Legacy",
    comment:
        "Rules in this category disallow the syntax contained in [Annex B](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html) or Legacy.",
    rules: [],
}
categories.nonstandard = {
    id: "nonstandard",
    title: "Non-standards",
    comment:
        "Rules in this category disallow features that are not defined in ECMAScript.",
    rules: [],
}
categories.uncategorized = {
    id: "uncategorized",
    title: "Uncategorized",
    rules: [],
}
categories.deprecated = {
    id: "deprecated",
    title: "Deprecated",
    comment:
        "😇 We don't fix bugs which are in deprecated rules since we don't have enough resources.",
    rules: [],
}

/** @type {Rule[]} */
const rules = []

// 全ルールを探す
;(function walk(dirPath) {
    const requireRule = createRequire(__filename)
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            walk(path.join(dirPath, entry.name))
            continue
        }

        const filePath = path.join(dirPath, entry.name)
        const ruleId = path
            .relative(libRoot, filePath)
            .replace(/\.js$/u, "")
            .replace(/\\/gu, "/")
        const ruleModule = requireRule(filePath)
        const category = ruleModule.meta.docs.category
        const proposalIds = ruleModule.meta.docs.proposal
            ? [ruleModule.meta.docs.proposal].flat()
            : []

        const deprecated = ruleModule.meta.deprecated || false
        const replacedBy = deprecated ? ruleModule.meta.replacedBy || [] : []
        const description = ruleModule.meta.docs.description.replace(/\.$/u, "")
        const fixable = ruleModule.meta.fixable
        const schema = ruleModule.meta.schema
        const rule = {
            ruleId,
            description,
            fixable,
            deprecated,
            replacedBy,
            proposals: proposalIds,
            schema,
        }

        const categoryId = deprecated
            ? "deprecated"
            : category || "uncategorized"

        categories[categoryId].rules.push(rule)

        rules.push(rule)

        for (const proposal of proposalIds) {
            const id = `no-${proposal}`

            if (!proposals[proposal]) {
                throw new Error(
                    `Missing define proposal: ${proposal}\nWe need to add it to scripts/proposals.js.`,
                )
            }

            const baseCategory = categories[category]

            ;(categories[id] = categories[id] || {
                id,
                title: `${baseCategory.title} [${proposals[proposal].title}](${proposals[proposal].link})`,
                edition: baseCategory.edition,
                year: baseCategory.year,
                rules: [],
                experimental: baseCategory.experimental,
                specKind: "proposal",
                configName: id,
            }).rules.push(rule)
        }
    }
})(libRoot)

module.exports = { categories, rules, LATEST_ES_YEAR }
