/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-weak-map"

new RuleTester().run("no-weak-map", rule, {
    valid: ["Array", "Object", "let WeakMap = 0; WeakMap"],
    invalid: [
        {
            code: "WeakMap",
            errors: ["ES2015 'WeakMap' class is forbidden."],
        },
        {
            code: "function f() { WeakMap }",
            errors: ["ES2015 'WeakMap' class is forbidden."],
        },
    ],
})
