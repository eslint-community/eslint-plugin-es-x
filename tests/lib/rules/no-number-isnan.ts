/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-number-isnan"

new RuleTester().run("no-number-isnan", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.isNaN"],
    invalid: [
        {
            code: "Number.isNaN",
            errors: ["ES2015 'Number.isNaN' method is forbidden."],
        },
    ],
})
