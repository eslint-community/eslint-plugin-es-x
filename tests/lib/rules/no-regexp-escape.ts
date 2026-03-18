"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-escape.js")

new RuleTester().run("no-regexp-escape", rule, {
    valid: ["RegExp.$1"],
    invalid: [
        {
            code: "RegExp.escape",
            errors: ["ES2025 'RegExp.escape' is forbidden."],
        },
    ],
})
