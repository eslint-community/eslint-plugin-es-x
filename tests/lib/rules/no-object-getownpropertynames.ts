/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-getownpropertynames"

new RuleTester().run("no-object-getownpropertynames", rule, {
    valid: [
        "Object",
        "Object.foo",
        "let Object = 0; Object.getOwnPropertyNames",
    ],
    invalid: [
        {
            code: "Object.getOwnPropertyNames",
            errors: ["ES5 'Object.getOwnPropertyNames' method is forbidden."],
        },
    ],
})
