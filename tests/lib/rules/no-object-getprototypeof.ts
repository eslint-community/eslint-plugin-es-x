/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-getprototypeof"

new RuleTester().run("no-object-getprototypeof", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.getPrototypeOf"],
    invalid: [
        {
            code: "Object.getPrototypeOf",
            errors: ["ES5 'Object.getPrototypeOf' method is forbidden."],
        },
    ],
})
