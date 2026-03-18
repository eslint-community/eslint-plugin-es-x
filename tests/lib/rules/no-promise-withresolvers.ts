"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-promise-withresolvers.js")

new RuleTester().run("no-promise-withresolvers", rule, {
    valid: ["Promise.all"],
    invalid: [
        {
            code: "Promise.withResolvers",
            errors: ["ES2024 'Promise.withResolvers' is forbidden."],
        },
    ],
})
