/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-math-trunc.ts"

new RuleTester().run("no-math-trunc", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.trunc"],
    invalid: [
        {
            code: "Math.trunc",
            errors: ["ES2015 'Math.trunc' method is forbidden."],
        },
    ],
})
