/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const libRoot = path.resolve("./lib/rules")
const ruleIds = fs
    .readdirSync(libRoot)
    .map(filename => path.basename(filename, ".js"))

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
        ${ruleIds
            .map(ruleId => `"${ruleId}": require("./rules/${ruleId}"),`)
            .join("\n        ")}
    },
}
`
)
