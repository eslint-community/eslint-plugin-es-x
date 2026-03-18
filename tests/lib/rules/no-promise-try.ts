/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-promise-try"

new RuleTester().run("no-promise-try", rule, {
    valid: ["Promise.all"],
    invalid: [
        {
            code: "Promise.try",
            errors: ["ES2025 'Promise.try' is forbidden."],
        },
    ],
})
