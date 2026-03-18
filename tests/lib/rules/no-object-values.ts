/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-values"

new RuleTester().run("no-object-values", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.values"],
    invalid: [
        {
            code: "Object.values",
            errors: ["ES2017 'Object.values' method is forbidden."],
        },
    ],
})
