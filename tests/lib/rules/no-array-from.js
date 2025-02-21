/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-from.js")

new RuleTester().run("no-array-from", rule, {
    valid: [
        "Array",
        "Array.of",
        "let Array = 0; Array.from",
        {
            code: "if (Array.from) { Array.from }",
            options: [{ allowTestedProperty: true }],
        },
        {
            code: "if (Array.from) { Array.from }",
            settings: { "es-x": { allowTestedProperty: true } },
        },
        {
            code: "if (Array.from) { const {from} = Array }",
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "Array.from",
            errors: ["ES2015 'Array.from' method is forbidden."],
        },
        {
            code: "const {from} = Array",
            errors: ["ES2015 'Array.from' method is forbidden."],
        },
        {
            code: "const {a:{from} = Array} = {}",
            errors: ["ES2015 'Array.from' method is forbidden."],
        },
        {
            code: "if (Array.from) { Array.from }",
            errors: 2,
        },
        {
            code: "if (Array.from) {  }",
            options: [{ allowTestedProperty: true }],
            errors: ["ES2015 'Array.from' method is forbidden."],
        },
    ],
})
