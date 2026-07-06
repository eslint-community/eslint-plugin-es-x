/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-math-cbrt.ts"

new RuleTester().run("no-math-cbrt", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.cbrt"],
    invalid: [
        {
            code: "Math.cbrt",
            errors: ["ES2015 'Math.cbrt' method is forbidden."],
        },
    ],
})
