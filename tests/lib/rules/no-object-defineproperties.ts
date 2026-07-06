/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-defineproperties.ts"

new RuleTester().run("no-object-defineproperties", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.defineProperties"],
    invalid: [
        {
            code: "Object.defineProperties",
            errors: ["ES5 'Object.defineProperties' method is forbidden."],
        },
    ],
})
