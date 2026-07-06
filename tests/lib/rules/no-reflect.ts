/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-reflect.ts"

new RuleTester().run("no-reflect", rule, {
    valid: ["Array", "Object", "let Reflect = 0; Reflect"],
    invalid: [
        {
            code: "Reflect",
            errors: ["ES2015 'Reflect' global object is forbidden."],
        },
        {
            code: "function f() { Reflect }",
            errors: ["ES2015 'Reflect' global object is forbidden."],
        },
    ],
})
