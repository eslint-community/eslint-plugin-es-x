/**
 * @author Sosuke Suzuki <https://github.com/sosukesuzuki>
 * See LICENSE file in root directory for full license.
 */

"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-error-cause.js")

if (!RuleTester.isSupported(2022)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-error-cause.")
    return
}

new RuleTester({
    parserOptions: { sourceType: "module" },
}).run("no-error-cause", rule, {
    valid: [
        'new Error("message")',
        'new Error("message", notObjectExpression )',
        'new Error("message", { notCause: foo })',
    ],
    invalid: [
        {
            code: 'new Error("message", { cause: foo });',
            errors: ["ES2022 Error Cause is forbidden."],
        },
    ],
})
