import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-groupby"

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
