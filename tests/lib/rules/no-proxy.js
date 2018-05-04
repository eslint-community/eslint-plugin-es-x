/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-proxy.js")

new RuleTester().run("no-proxy", rule, {
    valid: ["Array", "Object", "let Proxy = 0; Proxy"],
    invalid: [
        {
            code: "Proxy",
            errors: ["ES2015 'Proxy' class is forbidden."],
        },
        {
            code: "function f() { Proxy }",
            errors: ["ES2015 'Proxy' class is forbidden."],
        },
    ],
})
