/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-map"

new RuleTester().run("no-map", rule, {
    valid: ["Array", "Object", "let Map = 0; Map"],
    invalid: [
        {
            code: "Map",
            errors: ["ES2015 'Map' class is forbidden."],
        },
        {
            code: "function f() { Map }",
            errors: ["ES2015 'Map' class is forbidden."],
        },
    ],
})
