/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-getownpropertysymbols"

new RuleTester().run("no-object-getownpropertysymbols", rule, {
    valid: [
        "Object",
        "Object.assign",
        "let Object = 0; Object.getOwnPropertySymbols",
    ],
    invalid: [
        {
            code: "Object.getOwnPropertySymbols",
            errors: [
                "ES2015 'Object.getOwnPropertySymbols' method is forbidden.",
            ],
        },
    ],
})
