/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-entries"

new RuleTester().run("no-object-entries", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.entries"],
    invalid: [
        {
            code: "Object.entries",
            errors: ["ES2017 'Object.entries' method is forbidden."],
        },
    ],
})
