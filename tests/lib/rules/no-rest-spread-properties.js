/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-rest-spread-properties.js")

new RuleTester().run("no-rest-spread-properties", rule, {
    valid: [
        "[...a]",
        "[...a] = array",
        "({a: [...b]})",
        "({a: [...b]} = obj)",
        "function f(...a) {}",
        "f(...a)",
    ],
    invalid: [
        {
            code: "({...a})",
            errors: ["ES2018 rest/spread properties are forbidden."],
        },
        {
            code: "({...a} = obj)",
            errors: ["ES2018 rest/spread properties are forbidden."],
        },
        {
            code: "for ({...a} of x) {}",
            errors: ["ES2018 rest/spread properties are forbidden."],
        },
        {
            code: "function f({...a}) {}",
            errors: ["ES2018 rest/spread properties are forbidden."],
        },
    ],
})
