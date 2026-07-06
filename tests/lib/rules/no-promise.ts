/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-promise.ts"

new RuleTester().run("no-promise", rule, {
    valid: ["Array", "Object", "let Promise = 0; Promise"],
    invalid: [
        {
            code: "Promise",
            errors: ["ES2015 'Promise' class is forbidden."],
        },
        {
            code: "function f() { Promise }",
            errors: ["ES2015 'Promise' class is forbidden."],
        },
    ],
})
