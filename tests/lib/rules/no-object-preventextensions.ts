/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-preventextensions.js")

new RuleTester().run("no-object-preventextensions", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.preventExtensions"],
    invalid: [
        {
            code: "Object.preventExtensions",
            errors: ["ES5 'Object.preventExtensions' method is forbidden."],
        },
    ],
})
