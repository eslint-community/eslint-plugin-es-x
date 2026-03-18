/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-promise-all-settled"

new RuleTester().run("no-promise-all-settled", rule, {
    valid: ["Promise.all"],
    invalid: [
        {
            code: "Promise.allSettled",
            errors: ["ES2020 'Promise.allSettled' function is forbidden."],
        },
    ],
})
