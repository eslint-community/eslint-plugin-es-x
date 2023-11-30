"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-map-groupby.js")

new RuleTester().run("no-object-map-groupby", rule, {
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
            errors: ["ES2024 'Object.groupBy' method is forbidden."],
        },
        {
            code: "Map.groupBy",
            errors: ["ES2024 'Map.groupBy' method is forbidden."],
        },
    ],
})
