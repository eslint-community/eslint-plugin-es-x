/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const { rules } = require("./rules")

fs.writeFileSync(
    "lib/index.js",
    `/**
 * DON'T EDIT THIS FILE.
 * This file was generated automatically by 'scripts/update-index.js'.
 */
"use strict"

module.exports = {
    configs: {},
    rules: {
        ${rules
            .map(({ ruleId }) => `"${ruleId}": require("./rules/${ruleId}"),`)
            .join("\n        ")}
    },
}
`
)
