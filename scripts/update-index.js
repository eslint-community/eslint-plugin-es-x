/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const { categories, rules } = require("./rules")

fs.writeFileSync(
    "lib/index.js",
    `/**
 * DON'T EDIT THIS FILE.
 * This file was generated automatically by 'scripts/update-index.js'.
 */
"use strict"

module.exports = {
    configs: {
        ${Object.keys(categories)
            .map(
                id => `"no-${id.slice(2)}": {
            rules: {
                ${categories[id].rules
                    .map(({ ruleId }) => `"es/${ruleId}": "error",`)
                    .join("\n                ")}
            },
        },`
            )
            .join("\n        ")}
    },
    rules: {
        ${rules
            .map(({ ruleId }) => `"${ruleId}": require("./rules/${ruleId}"),`)
            .join("\n        ")}
    },
}
`
)
