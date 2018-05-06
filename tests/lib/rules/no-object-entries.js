/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-entries.js")

new RuleTester().run("no-object-entries", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.entries"],
    invalid: [
        {
            code: "Object.entries",
            errors: ["ES2017 'Object.entries' method is forbidden."],
        },
    ],
})
