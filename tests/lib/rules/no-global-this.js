/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-global-this.js")

if (!RuleTester.isSupported(2020)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-global-this.")
    return
}

new RuleTester().run("no-global-this", rule, {
    valid: ["window", "global", "self", "{ let globalThis = 0; globalThis }"],
    invalid: [
        {
            code: "globalThis",
            errors: ["ES2020 'globalThis' variable is forbidden."],
        },
        {
            code: "window.globalThis",
            globals: { window: "readonly" },
            errors: ["ES2020 'globalThis' variable is forbidden."],
        },
    ],
})
