/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-create.js")

new RuleTester().run("no-object-create", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.create"],
    invalid: [
        {
            code: "Object.create",
            errors: ["ES5 'Object.create' method is forbidden."],
        },
    ],
})
