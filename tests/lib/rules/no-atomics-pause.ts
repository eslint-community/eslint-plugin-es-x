import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-atomics-pause"

new RuleTester().run("no-atomics-pause", rule, {
    valid: ["Atomics", "Atomics.wait", "let Atomics = 0; Atomics.pause"],
    invalid: [
        {
            code: "Atomics.pause",
            errors: ["ES2026 'Atomics.pause' method is forbidden."],
        },
    ],
})
