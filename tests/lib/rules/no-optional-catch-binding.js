/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-optional-catch-binding.js")

if (!RuleTester.isSupported(2019)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-optional-catch-binding.")
    return
}

new RuleTester().run("no-optional-catch-binding", rule, {
    valid: ["try {} catch (err) {}"],
    invalid: [
        {
            code: "try {} catch {}",
            errors: ["ES2019 optional 'catch' binding is forbidden."],
        },
    ],
})
