/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-issealed.ts"

new RuleTester().run("no-object-issealed", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.isSealed"],
    invalid: [
        {
            code: "Object.isSealed",
            errors: ["ES5 'Object.isSealed' method is forbidden."],
        },
    ],
})
