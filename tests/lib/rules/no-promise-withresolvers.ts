import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-promise-withresolvers"

new RuleTester().run("no-promise-withresolvers", rule, {
    valid: ["Promise.all"],
    invalid: [
        {
            code: "Promise.withResolvers",
            errors: ["ES2024 'Promise.withResolvers' is forbidden."],
        },
    ],
})
