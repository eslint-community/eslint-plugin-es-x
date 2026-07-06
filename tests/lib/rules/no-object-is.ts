/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-is.ts"

new RuleTester().run("no-object-is", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.is"],
    invalid: [
        {
            code: "Object.is",
            errors: ["ES2015 'Object.is' method is forbidden."],
        },
    ],
})
