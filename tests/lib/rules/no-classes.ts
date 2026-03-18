/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-classes"

new RuleTester().run("no-classes", rule, {
    valid: ["function A() {} A.prototype.foo = function() {}"],
    invalid: [
        {
            code: "class A {}",
            errors: ["ES2015 class declarations are forbidden."],
        },
        {
            code: "(class {})",
            errors: ["ES2015 class declarations are forbidden."],
        },
    ],
})
