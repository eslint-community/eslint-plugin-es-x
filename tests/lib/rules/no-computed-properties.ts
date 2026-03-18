/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-computed-properties"

new RuleTester().run("no-computed-properties", rule, {
    valid: ["({ foo: 1 })", "({ foo })", "({ foo() {} })"],
    invalid: [
        {
            code: "({ [a]: 1 })",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "({ [a]() {} })",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "({ get [a]() {} })",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "({ set [a](value) {} })",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "({ [a]: b } = obj)",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "function f({ [a]: b }) {}",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "class A { [a]() {} }",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "class A { get [a]() {} }",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "class A { set [a](value) {} }",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "class A { static [a]() {} }",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "(class A { [a]() {} })",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "(class A { get [a]() {} })",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "(class A { set [a](value) {} })",
            errors: ["ES2015 computed properties are forbidden."],
        },
        {
            code: "(class A { static [a]() {} })",
            errors: ["ES2015 computed properties are forbidden."],
        },
    ],
})
