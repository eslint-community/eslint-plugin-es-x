/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-getownpropertydescriptor.js")

new RuleTester().run("no-object-getownpropertydescriptor", rule, {
    valid: [
        "Object",
        "Object.foo",
        "let Object = 0; Object.getOwnPropertyDescriptor",
    ],
    invalid: [
        {
            code: "Object.getOwnPropertyDescriptor",
            errors: [
                "ES5 'Object.getOwnPropertyDescriptor' method is forbidden.",
            ],
        },
    ],
})
