/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-math-log2"

new RuleTester().run("no-math-log2", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.log2"],
    invalid: [
        {
            code: "Math.log2",
            errors: ["ES2015 'Math.log2' method is forbidden."],
        },
    ],
})
