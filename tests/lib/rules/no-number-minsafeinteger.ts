/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-number-minsafeinteger.ts"

new RuleTester().run("no-number-minsafeinteger", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.MIN_SAFE_INTEGER"],
    invalid: [
        {
            code: "Number.MIN_SAFE_INTEGER",
            errors: ["ES2015 'Number.MIN_SAFE_INTEGER' property is forbidden."],
        },
    ],
})
