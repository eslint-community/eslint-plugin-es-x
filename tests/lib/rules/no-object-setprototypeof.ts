/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-setprototypeof"

new RuleTester().run("no-object-setprototypeof", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.setPrototypeOf"],
    invalid: [
        {
            code: "Object.setPrototypeOf",
            errors: ["ES2015 'Object.setPrototypeOf' method is forbidden."],
        },
    ],
})
