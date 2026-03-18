/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-global-this.js")

new RuleTester().run("no-global-this", rule, {
    valid: ["window", "global", "self", "{ let globalThis = 0; globalThis }"],
    invalid: [
        {
            code: "globalThis",
            errors: ["ES2020 'globalThis' variable is forbidden."],
        },
        {
            code: "window.globalThis",
            errors: ["ES2020 'globalThis' variable is forbidden."],
            languageOptions: { globals: { window: "readonly" } },
        },
    ],
})
