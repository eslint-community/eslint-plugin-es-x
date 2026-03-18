/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-math-sinh"

new RuleTester().run("no-math-sinh", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.sinh"],
    invalid: [
        {
            code: "Math.sinh",
            errors: ["ES2015 'Math.sinh' method is forbidden."],
        },
    ],
})
