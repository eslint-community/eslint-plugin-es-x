/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-promise-any.ts"

new RuleTester().run("no-promise-any", rule, {
    valid: ["Promise.all", "Error", "RangeError"],
    invalid: [
        {
            code: "Promise.any",
            errors: ["ES2021 'Promise.any' is forbidden."],
        },
        {
            code: "AggregateError",
            errors: ["ES2021 'AggregateError' is forbidden."],
        },
        {
            code: "console.log(e instanceof AggregateError)",
            errors: ["ES2021 'AggregateError' is forbidden."],
        },
    ],
})
