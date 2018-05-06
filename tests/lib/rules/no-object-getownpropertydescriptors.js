/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-getownpropertydescriptors.js")

new RuleTester().run("no-object-getownpropertydescriptors", rule, {
    valid: [
        "Object",
        "Object.assign",
        "let Object = 0; Object.getOwnPropertyDescriptors",
    ],
    invalid: [
        {
            code: "Object.getOwnPropertyDescriptors",
            errors: [
                "ES2017 'Object.getOwnPropertyDescriptors' method is forbidden.",
            ],
        },
    ],
})
