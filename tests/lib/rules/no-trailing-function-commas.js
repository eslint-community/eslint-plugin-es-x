/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-trailing-function-commas.js")

new RuleTester().run("no-trailing-function-commas", rule, {
    valid: [
        "[1,]",
        "({a:1,})",
        "const [a,] = ary",
        "const {a,} = obj",
        "f()",
        "f(a)",
        "new F",
        "new F(a)",
        "function f() {}",
        "function f(a) {}",
    ],
    invalid: [
        {
            code: "function f(a,) {}",
            errors: [
                "ES2017 trailing commas in parameter/argument lists are forbidden.",
            ],
        },
        {
            code: "(function(a,) {})",
            errors: [
                "ES2017 trailing commas in parameter/argument lists are forbidden.",
            ],
        },
        {
            code: "(a,) => {}",
            errors: [
                "ES2017 trailing commas in parameter/argument lists are forbidden.",
            ],
        },
        {
            code: "({ f(a,) {} })",
            errors: [
                "ES2017 trailing commas in parameter/argument lists are forbidden.",
            ],
        },
        {
            code: "class A { f(a,) {} }",
            errors: [
                "ES2017 trailing commas in parameter/argument lists are forbidden.",
            ],
        },
        {
            code: "(class { f(a,) {} })",
            errors: [
                "ES2017 trailing commas in parameter/argument lists are forbidden.",
            ],
        },
        {
            code: "f(a,)",
            errors: [
                "ES2017 trailing commas in parameter/argument lists are forbidden.",
            ],
        },
        {
            code: "new F(a,)",
            errors: [
                "ES2017 trailing commas in parameter/argument lists are forbidden.",
            ],
        },
    ],
})
