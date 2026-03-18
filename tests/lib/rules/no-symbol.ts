/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-symbol"

new RuleTester().run("no-symbol", rule, {
    valid: ["Array", "Object", "let Symbol = 0; Symbol"],
    invalid: [
        {
            code: "Symbol",
            errors: ["ES2015 'Symbol' class is forbidden."],
        },
        {
            code: "function f() { Symbol }",
            errors: ["ES2015 'Symbol' class is forbidden."],
        },
    ],
})
