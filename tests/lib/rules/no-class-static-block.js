/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-class-static-block.js")

new RuleTester().run("no-class-static-block", rule, {
    valid: ["class A { static f() {} }", "class A { static get f() {} }"],
    invalid: [
        {
            code: "class A { static {}; }",
            errors: ["ES2022 class static block is forbidden."],
        },
        {
            code: "(class { static {} })",
            errors: ["ES2022 class static block is forbidden."],
        },
    ],
})
