/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-seal.js")

new RuleTester().run("no-object-seal", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.seal"],
    invalid: [
        {
            code: "Object.seal",
            errors: ["ES5 'Object.seal' method is forbidden."],
        },
    ],
})
