import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-labelled-function-declarations"

new RuleTester({
    languageOptions: { sourceType: "script" },
}).run("no-labelled-function-declarations", rule, {
    valid: ["function f() {}", "label: { function f() {} }"],
    invalid: [
        {
            code: "label: function f() {}",
            errors: [
                "Annex B feature the labelled function declarations are forbidden.",
            ],
        },
    ],
})
