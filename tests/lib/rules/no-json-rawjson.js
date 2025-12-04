"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-json-rawjson.js")

new RuleTester().run("no-json-rawjson", rule, {
    valid: [
        "JSON",
        "JSON.parse",
        "let JSON = 0; JSON.rawJSON",
        {
            code: "if (JSON.rawJSON) JSON.rawJSON(foo)",
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "JSON.rawJSON",
            errors: ["ES2026 'JSON.rawJSON' method is forbidden."],
        },
        {
            code: "if (JSON.rawJSON) JSON.rawJSON(foo)",
            errors: 2,
        },
        {
            code: "JSON.rawJSON(foo)",
            options: [{ allowTestedProperty: true }],
            errors: ["ES2026 'JSON.rawJSON' method is forbidden."],
        },
    ],
})
