/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-keys.js")

new RuleTester().run("no-object-keys", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.keys"],
    invalid: [
        {
            code: "Object.keys",
            errors: ["ES5 'Object.keys' method is forbidden."],
        },
    ],
})
