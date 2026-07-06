import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-map-groupby.ts"

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
            errors: ["ES2024 'Object.groupBy' is forbidden."],
        },
        {
            code: "Map.groupBy",
            errors: ["ES2024 'Map.groupBy' is forbidden."],
        },
    ],
})
