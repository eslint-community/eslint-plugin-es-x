/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-date-now"

new RuleTester().run("no-date-now", rule, {
    valid: ["Date", "Date.parse", "let Date = 0; Date.now"],
    invalid: [
        {
            code: "Date.now",
            errors: ["ES5 'Date.now' method is forbidden."],
        },
    ],
})
