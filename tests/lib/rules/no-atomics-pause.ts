import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-atomics-pause.ts"

new RuleTester().run("no-atomics-pause", rule, {
    valid: ["Atomics", "Atomics.wait", "let Atomics = 0; Atomics.pause"],
    invalid: [
        {
            code: "Atomics.pause",
            errors: ["ES2027 'Atomics.pause' method is forbidden."],
        },
    ],
})
