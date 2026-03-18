/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-optional-catch-binding.js")

new RuleTester().run("no-optional-catch-binding", rule, {
    valid: ["try {} catch (err) {}"],
    invalid: [
        {
            code: "try {} catch {}",
            errors: ["ES2019 optional 'catch' binding is forbidden."],
        },
    ],
})
