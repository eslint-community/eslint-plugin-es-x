/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-is.js")

new RuleTester().run("no-object-is", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.is"],
    invalid: [
        {
            code: "Object.is",
            errors: ["ES2015 'Object.is' method is forbidden."],
        },
    ],
})
