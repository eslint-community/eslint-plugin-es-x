/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-block-scoped-variables"

new RuleTester().run("no-block-scoped-variables", rule, {
    valid: [
        "var a = 1",
        "function f(a) {}",
        "function f(a = 1) {}",
        "try {} catch (e) {}",
    ],
    invalid: [
        {
            code: "const a = 1",
            errors: ["ES2015 block-scoped variables are forbidden."],
        },
        {
            code: "let a = 1",
            errors: ["ES2015 block-scoped variables are forbidden."],
        },
        {
            code: "{ const a = 1 }",
            errors: ["ES2015 block-scoped variables are forbidden."],
        },
        {
            code: "{ let a = 1 }",
            errors: ["ES2015 block-scoped variables are forbidden."],
        },
        {
            code: "function wrap() { const a = 1 }",
            errors: ["ES2015 block-scoped variables are forbidden."],
        },
        {
            code: "function wrap() { let a = 1 }",
            errors: ["ES2015 block-scoped variables are forbidden."],
        },
    ],
})
