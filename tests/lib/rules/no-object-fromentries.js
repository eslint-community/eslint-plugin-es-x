/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-fromentries.js")

new RuleTester().run("no-object-fromentries", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.fromEntries"],
    invalid: [
        {
            code: "Object.fromEntries",
            errors: ["ES2019 'Object.fromEntries' method is forbidden."],
        },
    ],
})
