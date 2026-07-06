/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-class-static-block.ts"

new RuleTester().run("no-class-static-block", rule, {
    valid: ["class A { static f() {} }", "class A { static get f() {} }"],
    invalid: [
        {
            code: "class A { static {}; }",
            errors: ["ES2022 class static block is forbidden."],
        },
        {
            code: "(class { static {} })",
            errors: ["ES2022 class static block is forbidden."],
        },
    ],
})
