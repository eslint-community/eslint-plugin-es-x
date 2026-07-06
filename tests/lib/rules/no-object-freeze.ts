/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-freeze.ts"

new RuleTester().run("no-object-freeze", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.freeze"],
    invalid: [
        {
            code: "Object.freeze",
            errors: ["ES5 'Object.freeze' method is forbidden."],
        },
    ],
})
