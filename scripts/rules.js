/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const proposals = require("./proposals")
const libRoot = path.resolve(__dirname, "../lib/rules")

/**
 * @typedef {Object} Rule
 * @property {string} ruleId The rule name.
 * @property {string} description The description.
 * @property {boolean} fixable The fixable flag.
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
const LATEST_ES_YEAR = 2023

/** @type {Record<string, Category>} */
const categories = [
    ...(function* () {
        const max = new Date().getFullYear() + 1
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
        const content = fs.readFileSync(filePath, "utf8")
        const contentWithoutComments = content.replace(
            /("(?:\\"|[^"])*?"|'(?:\\'|[^'])*?')|\/\/[^\n]*|\/\*[\s\S]*?\*\//gu,
            "$1",
        )
        const category = /category:[\s]*(?:undefined|"(.+)")/u.exec(
            contentWithoutComments,
        )[1]
        const proposalJson = /proposal:[\s]*(".+?"|\[.+?\])/u.exec(
            contentWithoutComments,
        )?.[1]
        const proposalIds = proposalJson
            ? [JSON.parse(proposalJson)].flat()
            : []
        const deprecated = /deprecated:[\s]+true/u.test(contentWithoutComments)
        const replacedBy = deprecated
            ? JSON.parse(
                  /replacedBy:[\s]*(\[[\s\S]*?\])/u
                      .exec(contentWithoutComments)[1]
                      .replace(/,\s*\]/u, "]"),
              )
            : []
        const description = /description:[\s]*"(.+?)\.?"/u.exec(
            contentWithoutComments,
        )[1]
        const fixable = /fixable:[\s\n]+"(.+)"/u.test(contentWithoutComments)
        const rule = {
            ruleId,
            description: JSON.parse(`"${description}"`),
            fixable,
            deprecated,
            replacedBy,
            proposals: proposalIds,
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

module.exports = { categories, rules }
