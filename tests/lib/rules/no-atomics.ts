/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-atomics.ts"

new RuleTester().run("no-atomics", rule, {
    valid: ["Array", "Object", "let Atomics = 0; Atomics"],
    invalid: [
        {
            code: "Atomics",
            errors: ["ES2017 'Atomics' global object is forbidden."],
        },
        {
            code: "function f() { Atomics }",
            errors: ["ES2017 'Atomics' global object is forbidden."],
        },
    ],
})
