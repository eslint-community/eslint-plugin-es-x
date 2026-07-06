/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-generators.ts"

new RuleTester().run("no-generators", rule, {
    valid: ["function f() {}", "yield = 0"],
    invalid: [
        {
            code: "function* f() {}",
            errors: ["ES2015 generator function declarations are forbidden."],
        },
        {
            code: "(function*() {})",
            errors: ["ES2015 generator function declarations are forbidden."],
        },
        {
            code: "({ *f() {} })",
            errors: ["ES2015 generator function declarations are forbidden."],
        },
        {
            code: "class A { *f() {} }",
            errors: ["ES2015 generator function declarations are forbidden."],
        },
        {
            code: "class A { static *f() {} }",
            errors: ["ES2015 generator function declarations are forbidden."],
        },
    ],
})
