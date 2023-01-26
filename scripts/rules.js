/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
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
 * @property {string} [configName] The config name.
 * @property {string} [aboveConfigName] The config name for disallowing features all above.
 * @property {Rule[]} rules The rules in this category.
 * @property {boolean} [experimental] The flag to be belong to experimental configs.
 * @property {string} [comment] The category comment.
 * @property {"ecma262" | "ecma402"} specKind The specification kind.
 */

/** @type {Record<string, Category>} */
const categories = [
    2023,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    [5, 1],
    [3, null],
]
    .map((esVersion) =>
        Array.isArray(esVersion) ? esVersion : [esVersion, esVersion],
    )
    .reduce((map, versions, index, list) => {
        const experimental = index === 0
        const [vFor262, _vFor402] = versions
        const [prevVFor262, _prevVFor402] = list[index + 1] || [null, null]
        const ecma262Id = `ES${vFor262}`
        if (prevVFor262) {
            map[ecma262Id] = {
                id: ecma262Id,
                title: `ES${vFor262}`,
                edition: vFor262 > 5 ? vFor262 - 2009 : vFor262,
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
        // TODO: https://github.com/eslint-community/eslint-plugin-es-x/issues/45
        // if (vFor402 && prevVFor402) {
        //     const ecma402Id = `ES${vFor402}-Intl-API`
        //     map[ecma402Id] = {
        //         id: ecma402Id,
        //         title: `ES${vFor402} Intl API`,
        //         edition: vFor402 - 2013,
        //         rules: [],
        //         experimental,
        //         specKind: "ecma402",
        //         configName: experimental
        //             ? "no-new-in-esnext-intl-api"
        //             : `no-new-in-es${vFor402}-intl-api`,
        //         aboveConfigName: experimental
        //             ? undefined
        //             : prevVFor402 === 1
        //             ? "restrict-to-es-intl-api-1st-edition"
        //             : `restrict-to-es${prevVFor402}-intl-api`,
        //     }
        // }
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
        const category = /category:[\s\n]+(?:undefined|"(.+)")/u.exec(
            contentWithoutComments,
        )[1]
        const description = /description:[\s\n]+"(.+?)\.?"/u.exec(
            contentWithoutComments,
        )[1]
        const fixable = /fixable:[\s\n]+"(.+)"/u.test(contentWithoutComments)
        const rule = {
            ruleId,
            description: JSON.parse(`"${description}"`),
            fixable,
        }

        categories[category || "uncategorized"].rules.push(rule)

        rules.push(rule)
    }
})(libRoot)

module.exports = { categories, rules }
