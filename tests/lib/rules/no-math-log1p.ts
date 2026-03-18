/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-math-log1p"

new RuleTester().run("no-math-log1p", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.log1p"],
    invalid: [
        {
            code: "Math.log1p",
            errors: ["ES2015 'Math.log1p' method is forbidden."],
        },
    ],
})
