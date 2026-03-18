/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-create"

new RuleTester().run("no-object-create", rule, {
    valid: ["Object", "Object.foo", "let Object = 0; Object.create"],
    invalid: [
        {
            code: "Object.create",
            errors: ["ES5 'Object.create' method is forbidden."],
        },
    ],
})
