/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-object-hasown"

new RuleTester().run("no-object-hasown", rule, {
    valid: ["Object", "Object.assign", "let Object = 0; Object.is"],
    invalid: [
        {
            code: "Object.hasOwn",
            errors: ["ES2022 'Object.hasOwn' method is forbidden."],
        },
    ],
})
