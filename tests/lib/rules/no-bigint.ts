/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-bigint"

new RuleTester().run("no-bigint", rule, {
    valid: ["100"],
    invalid: [
        {
            code: "100n",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "({ 100n: null })",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "({ 100n() {} })",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "({ get 100n() {} })",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "class A { 100n() {} }",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "class A { get 100n() {} }",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "BigInt",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "BigInt64Array",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "BigUint64Array",
            errors: ["ES2020 BigInt is forbidden."],
        },
    ],
})
