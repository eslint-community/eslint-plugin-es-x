/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-isfrozen"

new RuleTester().run("no-object-isfrozen", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.isFrozen"],
    invalid: [
        {
            code: "Object.isFrozen",
            errors: ["ES5 'Object.isFrozen' method is forbidden."],
        },
    ],
})
