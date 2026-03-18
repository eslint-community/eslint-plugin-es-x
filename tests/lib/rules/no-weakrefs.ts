/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-weakrefs.js")

new RuleTester().run("no-weakrefs", rule, {
    valid: ["Array", "Object", "let WeakRef = 0; WeakRef"],
    invalid: [
        {
            code: "WeakRef",
            errors: ["ES2021 'WeakRef' class is forbidden."],
        },
        {
            code: "function f() { WeakRef }",
            errors: ["ES2021 'WeakRef' class is forbidden."],
        },
        {
            code: "FinalizationRegistry",
            errors: ["ES2021 'FinalizationRegistry' class is forbidden."],
        },
        {
            code: "function f() { FinalizationRegistry }",
            errors: ["ES2021 'FinalizationRegistry' class is forbidden."],
        },
    ],
})
