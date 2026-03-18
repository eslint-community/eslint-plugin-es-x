/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-rest-parameters.js")

new RuleTester().run("no-rest-parameters", rule, {
    valid: [
        "[a, ...b]",
        "[a, ...b] = array",
        "f(...a)",
        "new F(...a)",
        "function f([...a]) {}",
        "({...a})",
        "({...a} = obj)",
    ],
    invalid: [
        {
            code: "function f(...a) {}",
            errors: ["ES2015 rest parameters are forbidden."],
        },
        {
            code: "(function(...a) {})",
            errors: ["ES2015 rest parameters are forbidden."],
        },
        {
            code: "(...a) => {}",
            errors: ["ES2015 rest parameters are forbidden."],
        },
        {
            code: "({ f(...a) {} })",
            errors: ["ES2015 rest parameters are forbidden."],
        },
        {
            code: "class A { f(...a) {} }",
            errors: ["ES2015 rest parameters are forbidden."],
        },
        {
            code: "(class { f(...a) {} })",
            errors: ["ES2015 rest parameters are forbidden."],
        },
    ],
})
