/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-block-scoped-functions.js")

new RuleTester().run("no-block-scoped-functions", rule, {
    valid: [
        "function f() {}",
        {
            code: "function f() {}",
            parserOptions: { sourceType: "module" },
        },
        "function wrap() { function f() {} }",
        "(function() { function f() {} })()",
        "(() => { function f() {} })()",
        "({ wrap() { function f() {} } })",
        "class A { wrap() { function f() {} } }",
        "(class { wrap() { function f() {} } })",
        "(() => function f() {})()",
        "if (a) { (function f() {}) }",
        "if (a) { (() => {}) }",
    ],
    invalid: [
        {
            code: "{ function f() {} }",
            errors: ["ES2015 block-scoped functions are forbidden."],
        },
        {
            code: "if (a) { function f() {} }",
            errors: ["ES2015 block-scoped functions are forbidden."],
        },
        {
            code: "if (a) ; else { function f() {} }",
            errors: ["ES2015 block-scoped functions are forbidden."],
        },
        {
            code: "function wrap() { if (a) { function f() {} } }",
            errors: ["ES2015 block-scoped functions are forbidden."],
        },
    ],
})
