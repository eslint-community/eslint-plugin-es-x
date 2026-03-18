import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-regexp-escape"

new RuleTester().run("no-regexp-escape", rule, {
    valid: ["RegExp.$1"],
    invalid: [
        {
            code: "RegExp.escape",
            errors: ["ES2025 'RegExp.escape' is forbidden."],
        },
    ],
})
