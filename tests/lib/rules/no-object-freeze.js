/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-freeze.js")

new RuleTester().run("no-object-freeze", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.freeze"],
    invalid: [
        {
            code: "Object.freeze",
            errors: ["ES5 'Object.freeze' method is forbidden."],
        },
    ],
})
