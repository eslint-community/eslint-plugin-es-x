/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-getownpropertydescriptor"

new RuleTester().run("no-object-getownpropertydescriptor", rule, {
    valid: [
        "Object",
        "Object.foo",
        "let Object = 0; Object.getOwnPropertyDescriptor",
    ],
    invalid: [
        {
            code: "Object.getOwnPropertyDescriptor",
            errors: [
                "ES5 'Object.getOwnPropertyDescriptor' method is forbidden.",
            ],
        },
    ],
})
