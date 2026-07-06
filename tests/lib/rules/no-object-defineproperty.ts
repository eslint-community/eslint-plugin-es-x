/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-defineproperty.ts"

new RuleTester().run("no-object-defineproperty", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.defineProperty"],
    invalid: [
        {
            code: "Object.defineProperty",
            errors: ["ES5 'Object.defineProperty' method is forbidden."],
        },
    ],
})
