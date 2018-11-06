/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-object-super-properties.js")

new RuleTester().run("no-object-super-properties", rule, {
    valid: [
        "class A { foo() { super.a } }",
        "class A { foo() { super.foo() } }",
        "class A extends B { constructor() { super() } }",
    ],
    invalid: [
        {
            code: "({ foo() { super.a } })",
            errors: [
                "ES2015 'super' property accesses in object literals are forbidden.",
            ],
        },
        {
            code: "({ foo() { super.foo() } })",
            errors: [
                "ES2015 'super' property accesses in object literals are forbidden.",
            ],
        },
        {
            code: "({ foo() { return () => super.a } })",
            errors: [
                "ES2015 'super' property accesses in object literals are forbidden.",
            ],
        },
        {
            code:
                "({ foo() { ({ foo() { return () => super.a } }); class A { foo() { super.a } } return () => super.a } })",
            errors: [
                "ES2015 'super' property accesses in object literals are forbidden.",
                "ES2015 'super' property accesses in object literals are forbidden.",
            ],
        },
    ],
})
