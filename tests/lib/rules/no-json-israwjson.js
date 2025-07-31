"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-json-israwjson.js")

new RuleTester().run("no-json-israwjson", rule, {
    valid: ["JSON", "JSON.parse", "let JSON = 0; JSON.isRawJSON"],
    invalid: [
        {
            code: "JSON.isRawJSON",
            errors: ["ES2026 'JSON.isRawJSON' method is forbidden."],
        },
    ],
})
