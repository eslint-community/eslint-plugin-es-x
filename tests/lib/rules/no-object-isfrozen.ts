/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-isfrozen.js")

new RuleTester().run("no-object-isfrozen", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.isFrozen"],
    invalid: [
        {
            code: "Object.isFrozen",
            errors: ["ES5 'Object.isFrozen' method is forbidden."],
        },
    ],
})
