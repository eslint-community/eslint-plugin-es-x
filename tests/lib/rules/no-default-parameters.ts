/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-default-parameters.js")

new RuleTester().run("no-default-parameters", rule, {
    valid: [
        "function f(a, ...rest) {}",
        "const f = function(a, ...rest) {}",
        "const f = (a, ...rest) => {}",
        "({ method(a, ...rest) {} })",
        "class A { method(a, ...rest) {} }",
        "(class { method(a, ...rest) {} })",
        "var a = 1",
        "var {a = 0} = obj",
        "var [a = 0] = ary",
        "({a = 0} = obj)",
        "([a = 0] = ary)",
        "function f({a = 0}) {}",
        "function f([a = 0]) {}",
    ],
    invalid: [
        {
            code: "async function f(a = 0) {}",
            errors: ["ES2015 default parameters are forbidden."],
        },
        {
            code: "const f = async function(a = 0) {}",
            errors: ["ES2015 default parameters are forbidden."],
        },
        {
            code: "const f = async (a = 0) => {}",
            errors: ["ES2015 default parameters are forbidden."],
        },
        {
            code: "({ async method(a = 0) {} })",
            errors: ["ES2015 default parameters are forbidden."],
        },
        {
            code: "class A { async method(a = 0) {} }",
            errors: ["ES2015 default parameters are forbidden."],
        },
        {
            code: "(class { async method(a = 0) {} })",
            errors: ["ES2015 default parameters are forbidden."],
        },
        {
            code: "async function f({a} = 0) {}",
            errors: ["ES2015 default parameters are forbidden."],
        },
        {
            code: "async function f([a] = 0) {}",
            errors: ["ES2015 default parameters are forbidden."],
        },
    ],
})
