/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-property-shorthands.js")

new RuleTester().run("no-property-shorthands", rule, {
    valid: [
        "({})",
        "({ a: 1 })",
        "({ a: function(){} })",
        "({ get a() {}, set a(value) {} })",
        "({ [a]: 1 })",
        "({ ...a })",
        "({ a } = obj)",
    ],
    invalid: [
        {
            code: "({ a })",
            errors: ["ES2015 property shorthands are forbidden."],
        },
        {
            code: "({ a() {} })",
            errors: ["ES2015 property shorthands are forbidden."],
        },
        {
            code: "({ * a() {} })",
            errors: ["ES2015 property shorthands are forbidden."],
        },
        {
            code: "({ [a]() {} })",
            errors: ["ES2015 property shorthands are forbidden."],
        },
    ],
})
