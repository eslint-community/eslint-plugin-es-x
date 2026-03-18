/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-array-isarray"

new RuleTester().run("no-array-isarray", rule, {
    valid: [
        "Array",
        "Array.from",
        "let Array = 0; Array.isArray",
        {
            code: "if (Array.isArray) { Array.isArray }",
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "Array.isArray",
            errors: ["ES5 'Array.isArray' method is forbidden."],
        },
        {
            code: "if (Array.isArray) { Array.isArray }",
            errors: 2,
        },
    ],
})
