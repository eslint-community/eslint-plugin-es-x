/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-getprototypeof.js")

new RuleTester().run("no-object-getprototypeof", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.getPrototypeOf"],
    invalid: [
        {
            code: "Object.getPrototypeOf",
            errors: ["ES5 'Object.getPrototypeOf' method is forbidden."],
        },
    ],
})
