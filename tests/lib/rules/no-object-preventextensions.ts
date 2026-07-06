/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-preventextensions.ts"

new RuleTester().run("no-object-preventextensions", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.preventExtensions"],
    invalid: [
        {
            code: "Object.preventExtensions",
            errors: ["ES5 'Object.preventExtensions' method is forbidden."],
        },
    ],
})
