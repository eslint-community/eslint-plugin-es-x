import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-groupby.ts"

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
