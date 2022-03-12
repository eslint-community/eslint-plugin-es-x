"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-escape-unescape.js")
"".substr()
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
            errors: ["Annex B feature 'escape' is forbidden."],
        },
        {
            code: "unescape",
            errors: ["Annex B feature 'unescape' is forbidden."],
        },
        {
            code: "escape('')",
            errors: ["Annex B feature 'escape' is forbidden."],
        },
        {
            code: "unescape('')",
            errors: ["Annex B feature 'unescape' is forbidden."],
        },
        {
            code: "window.escape",
            globals: { window: "readonly" },
            errors: ["Annex B feature 'escape' is forbidden."],
        },
    ],
})
