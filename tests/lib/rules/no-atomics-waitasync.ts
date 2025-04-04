import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-atomics-waitasync"

new RuleTester().run("no-atomics-waitasync", rule, {
    valid: ["Atomics", "Atomics.wait", "let Atomics = 0; Atomics.waitAsync"],
    invalid: [
        {
            code: "Atomics.waitAsync",
            errors: ["ES2024 'Atomics.waitAsync' method is forbidden."],
        },
    ],
})
