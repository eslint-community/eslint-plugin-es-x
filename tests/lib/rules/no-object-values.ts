/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-values.js")

new RuleTester().run("no-object-values", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.values"],
    invalid: [
        {
            code: "Object.values",
            errors: ["ES2017 'Object.values' method is forbidden."],
        },
    ],
})
