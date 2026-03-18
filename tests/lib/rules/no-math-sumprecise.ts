import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-math-sumprecise"

new RuleTester().run("no-math-sumprecise", rule, {
    valid: ["Math", "Math.abs", "let Math = 0; Math.sumPrecise"],
    invalid: [
        {
            code: "Math.sumPrecise",
            errors: ["ES2026 'Math.sumPrecise' method is forbidden."],
        },
    ],
})
