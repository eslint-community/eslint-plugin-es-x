/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-number-parseint"

new RuleTester().run("no-number-parseint", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.parseInt"],
    invalid: [
        {
            code: "Number.parseInt",
            errors: ["ES2015 'Number.parseInt' method is forbidden."],
        },
    ],
})
