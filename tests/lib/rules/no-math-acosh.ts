/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-math-acosh"

new RuleTester().run("no-math-acosh", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.acosh"],
    invalid: [
        {
            code: "Math.acosh",
            errors: ["ES2015 'Math.acosh' method is forbidden."],
        },
    ],
})
