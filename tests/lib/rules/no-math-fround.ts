/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-math-fround"

new RuleTester().run("no-math-fround", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.fround"],
    invalid: [
        {
            code: "Math.fround",
            errors: ["ES2015 'Math.fround' method is forbidden."],
        },
    ],
})
