/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-setprototypeof.js")

new RuleTester().run("no-object-setprototypeof", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.setPrototypeOf"],
    invalid: [
        {
            code: "Object.setPrototypeOf",
            errors: ["ES2015 'Object.setPrototypeOf' method is forbidden."],
        },
    ],
})
