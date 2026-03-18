import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-regexp-v-flag"

new RuleTester().run("no-regexp-v-flag", rule, {
    valid: [
        "/foo/gimsu",
        "a\n/b/y",
        "new RegExp('foo')",
        "new RegExp('foo', 'gimsu')",
        "new RegExp('foo', flags)",
        "const flags = 'gimsu'; new RegExp('foo', flags)",
    ],
    invalid: [
        {
            code: "/foo/v",
            errors: ["ES2024 RegExp 'v' flag is forbidden."],
        },
        {
            code: "/foo/gimsyv",
            errors: ["ES2024 RegExp 'v' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'v')",
            errors: ["ES2024 RegExp 'v' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'gimsyv')",
            errors: ["ES2024 RegExp 'v' flag is forbidden."],
        },
        {
            code: "const pattern = 'foo', flags = 'gimsyv', regex = new RegExp(pattern, flags)",
            errors: ["ES2024 RegExp 'v' flag is forbidden."],
        },
    ],
})
