/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-assign"

new RuleTester().run("no-object-assign", rule, {
    valid: ["Object", "Object.is", "let Object = 0; Object.assign"],
    invalid: [
        {
            code: "Object.assign",
            errors: ["ES2015 'Object.assign' method is forbidden."],
        },
    ],
})
