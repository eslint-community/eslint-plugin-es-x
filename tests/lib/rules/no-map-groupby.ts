"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-map-groupby.js")

new RuleTester().run("no-map-groupby", rule, {
    valid: [
        "Object",
        "Map",
        "Object.assign",
        "let Object = 0; Object.groupBy",
        "let Map = 0; Map.groupBy",
    ],
    invalid: [
        {
            code: "Map.groupBy",
            errors: ["ES2024 'Map.groupBy' is forbidden."],
        },
    ],
})
