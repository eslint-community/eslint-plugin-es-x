"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-json-rawjson.js")

new RuleTester().run("no-json-rawjson", rule, {
    valid: ["JSON", "JSON.parse", "let JSON = 0; JSON.rawJSON"],
    invalid: [
        {
            code: "JSON.rawJSON",
            errors: ["ES2026 'JSON.rawJSON' method is forbidden."],
        },
    ],
})
