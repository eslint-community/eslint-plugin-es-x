/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-shared-array-buffer"

new RuleTester().run("no-shared-array-buffer", rule, {
    valid: ["Array", "Object", "let SharedArrayBuffer = 0; SharedArrayBuffer"],
    invalid: [
        {
            code: "SharedArrayBuffer",
            errors: ["ES2017 'SharedArrayBuffer' class is forbidden."],
        },
        {
            code: "function f() { SharedArrayBuffer }",
            errors: ["ES2017 'SharedArrayBuffer' class is forbidden."],
        },
    ],
})
