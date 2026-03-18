/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-number-parsefloat"

new RuleTester().run("no-number-parsefloat", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.parseFloat"],
    invalid: [
        {
            code: "Number.parseFloat",
            errors: ["ES2015 'Number.parseFloat' method is forbidden."],
        },
    ],
})
