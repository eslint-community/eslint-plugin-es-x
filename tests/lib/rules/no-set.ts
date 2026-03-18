/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-set"

new RuleTester().run("no-set", rule, {
    valid: ["Array", "Object", "let Set = 0; Set"],
    invalid: [
        {
            code: "Set",
            errors: ["ES2015 'Set' class is forbidden."],
        },
        {
            code: "function f() { Set }",
            errors: ["ES2015 'Set' class is forbidden."],
        },
    ],
})
