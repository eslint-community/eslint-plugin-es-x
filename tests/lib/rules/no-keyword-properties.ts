/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-keyword-properties"

new RuleTester().run("no-keyword-properties", rule, {
    valid: ["({ a, b, c}.a)", "({ let: 1, of: 2}.let)", "({ 'if': 1 }['if'])"],
    invalid: [
        {
            code: "({ if: 1 })",
            errors: ["ES5 reserved words as property names are forbidden."],
        },
        {
            code: "({ static: 2 })",
            errors: ["ES5 reserved words as property names are forbidden."],
        },
        {
            code: "obj.if",
            errors: ["ES5 reserved words as property names are forbidden."],
        },
        {
            code: "obj.class",
            errors: ["ES5 reserved words as property names are forbidden."],
        },
    ],
})
