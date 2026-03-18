"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-groupby.js")

new RuleTester().run("no-object-groupby", rule, {
    valid: [
        "Object",
        "Map",
        "Object.assign",
        "let Object = 0; Object.groupBy",
        "let Map = 0; Map.groupBy",
    ],
    invalid: [
        {
            code: "Object.groupBy",
            errors: ["ES2024 'Object.groupBy' is forbidden."],
        },
    ],
})
