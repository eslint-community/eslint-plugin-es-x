/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-json.ts"

new RuleTester().run("no-json", rule, {
    valid: ["let JSON = 0; JSON"],
    invalid: [
        {
            code: "JSON",
            errors: ["ES5 'JSON' global object is forbidden."],
        },
        {
            code: "JSON.parse",
            errors: ["ES5 'JSON' global object is forbidden."],
        },
        {
            code: "JSON.stringify",
            errors: ["ES5 'JSON' global object is forbidden."],
        },
    ],
})
