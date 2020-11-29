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
 * @property {number} revision The revision number.
 * @property {string} configName The config name.
 * @property {string} aboveConfigName The config name for disallowing features all above.
 * @property {Rule[]} rules The rules in this category.
 * @property {boolean} [experimental] The flag to be belong to experimental configs.
 */

/** @type {Record<string, Category>} */
const categories = [12, 11, 10, 9, 8, 7, 6, 5].reduce(
    (map, revision, _, [latest]) => {
        const year = revision <= 5 ? 5 : 2009 + revision
        const id = `ES${year}`
        map[id] = {
            id,
            revision,
            rules: [],
            experimental: revision === latest,
        }
        return map
    },
    {},
)

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
        const category = /category:[\s\n]+(?:undefined|"(.+)")/u.exec(
            content,
        )[1]
        const description = /description:[\s\n]+"(.+?)\.?"/u.exec(content)[1]
        const fixable = /fixable:[\s\n]+"(.+)"/u.test(content)
        const rule = {
            ruleId,
            description: JSON.parse(`"${description}"`),
            fixable,
        }

        if (category) {
            categories[category].rules.push(rule)
        }
        rules.push(rule)
    }
})(libRoot)

module.exports = { categories, rules }
