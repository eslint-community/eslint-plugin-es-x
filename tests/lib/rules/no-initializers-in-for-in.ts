import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-initializers-in-for-in.ts"

new RuleTester().run("no-initializers-in-for-in", rule, {
    valid: [
        "for (var x in obj) {}",
        "for (let x in obj) {}",
        "for (var {x=42} in obj) {}",
    ],
    invalid: [
        {
            code: "for (var x=42 in obj) {}",
            errors: [
                "Annex B feature the initializers in for-in heads are forbidden.",
            ],
        },
    ],
})
