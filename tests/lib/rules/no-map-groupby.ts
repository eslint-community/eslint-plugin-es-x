import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-map-groupby"

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
