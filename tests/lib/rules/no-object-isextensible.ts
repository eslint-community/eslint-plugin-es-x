/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-isextensible.ts"

new RuleTester().run("no-object-isextensible", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.isExtensible"],
    invalid: [
        {
            code: "Object.isExtensible",
            errors: ["ES5 'Object.isExtensible' method is forbidden."],
        },
    ],
})
