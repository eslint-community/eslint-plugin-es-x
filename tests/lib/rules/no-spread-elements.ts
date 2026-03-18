/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-spread-elements"

new RuleTester().run("no-spread-elements", rule, {
    valid: [
        "[a, ...b] = array",
        "function f(a, ...b) {}",
        "for ([a, ...b] of c) {}",
        "({ ...a })",
        "({ ...a } = obj)",
    ],
    invalid: [
        {
            code: "f(...a, b)",
            errors: ["ES2015 spread elements are forbidden."],
        },
        {
            code: "f(a, ...b)",
            errors: ["ES2015 spread elements are forbidden."],
        },
        {
            code: "new F(...a, b)",
            errors: ["ES2015 spread elements are forbidden."],
        },
        {
            code: "[...a, b]",
            errors: ["ES2015 spread elements are forbidden."],
        },
    ],
})
