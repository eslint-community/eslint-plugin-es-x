/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-array-of.ts"

new RuleTester().run("no-array-of", rule, {
    valid: ["Array", "Array.from", "let Array = 0; Array.of"],
    invalid: [
        {
            code: "Array.of",
            errors: ["ES2015 'Array.of' method is forbidden."],
        },
    ],
})
