"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-escape-unescape.js")

new RuleTester().run("no-escape-unescape", rule, {
    valid: [
        "encodeURI",
        "decodeURI",
        "{ let escape = 0; escape }",
        "{ let unescape = 0; unescape }",
    ],
    invalid: [
        {
            code: "escape",
            errors: ["'escape' is forbidden."],
        },
        {
            code: "unescape",
            errors: ["'unescape' is forbidden."],
        },
        {
            code: "escape('')",
            errors: ["'escape' is forbidden."],
        },
        {
            code: "unescape('')",
            errors: ["'unescape' is forbidden."],
        },
        {
            code: "window.escape",
            globals: { window: "readonly" },
            errors: ["'escape' is forbidden."],
        },
    ],
})
