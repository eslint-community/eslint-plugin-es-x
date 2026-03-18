/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-math-clz32"

new RuleTester().run("no-math-clz32", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.clz32"],
    invalid: [
        {
            code: "Math.clz32",
            errors: ["ES2015 'Math.clz32' method is forbidden."],
        },
    ],
})
