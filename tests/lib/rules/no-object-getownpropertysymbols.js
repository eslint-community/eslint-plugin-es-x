/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-getownpropertysymbols.js")

new RuleTester().run("no-object-getownpropertysymbols", rule, {
    valid: [
        "Object",
        "Object.assign",
        "let Object = 0; Object.getOwnPropertySymbols",
    ],
    invalid: [
        {
            code: "Object.getOwnPropertySymbols",
            errors: [
                "ES2015 'Object.getOwnPropertySymbols' method is forbidden.",
            ],
        },
    ],
})
