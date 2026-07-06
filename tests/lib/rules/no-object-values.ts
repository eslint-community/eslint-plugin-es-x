/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-object-values.ts"

new RuleTester().run("no-object-values", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.values"],
    invalid: [
        {
            code: "Object.values",
            errors: ["ES2017 'Object.values' method is forbidden."],
        },
    ],
})
