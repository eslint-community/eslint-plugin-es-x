/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-class-fields.js")

// if (!RuleTester.isSupported(2022)) {
//     //eslint-disable-next-line no-console
//     console.log("Skip the tests of no-class-fields.")
//     return
// }

new RuleTester({
    parser: require.resolve("espree"), // espree v8.0.0-beta.x
    parserOptions: {
        ecmaVersion: 2022,
    },
}).run("no-class-fields", rule, {
    valid: [
        "class A {}",
        "class A { foo() {} }",
        "class A { get foo() {} }",
        "class A { set foo(v) {} }",
        "class A { *foo() {} }",
        "class A { async foo() {} }",
        "class A { static foo() {} }",
        "class A { static get foo() {} }",
        "class A { static set foo(v) {} }",
        "class A { static *foo() {} }",
        "class A { static async foo() {} }",
        "class A { [foo]() {} }",
        "class A { get [foo]() {} }",
        "class A { set [foo](v) {} }",
        "class A { *[foo]() {} }",
        "class A { async [foo]() {} }",
        "class A { static [foo]() {} }",
        "class A { static get [foo]() {} }",
        "class A { static set [foo](v) {} }",
        "class A { static *[foo]() {} }",
        "class A { static async [foo]() {} }",
    ],
    invalid: [
        {
            code: "class A { #foo() {} }",
            errors: ["ES2020 private method #foo is forbidden."],
        },
        {
            code: "class A { get #foo() {} }",
            errors: ["ES2020 private getter #foo is forbidden."],
        },
        {
            code: "class A { set #foo(v) {} }",
            errors: ["ES2020 private setter #foo is forbidden."],
        },
        {
            code: "class A { *#foo() {} }",
            errors: ["ES2020 private generator method #foo is forbidden."],
        },
        {
            code: "class A { async #foo() {} }",
            errors: ["ES2020 private async method #foo is forbidden."],
        },
        {
            code: "class A { static #foo() {} }",
            errors: ["ES2020 static private method #foo is forbidden."],
        },
        {
            code: "class A { static get #foo() {} }",
            errors: ["ES2020 static private getter #foo is forbidden."],
        },
        {
            code: "class A { static set #foo(v) {} }",
            errors: ["ES2020 static private setter #foo is forbidden."],
        },
        {
            code: "class A { static *#foo() {} }",
            errors: [
                "ES2020 static private generator method #foo is forbidden.",
            ],
        },
        {
            code: "class A { static async #foo() {} }",
            errors: ["ES2020 static private async method #foo is forbidden."],
        },

        {
            code: "class A { foo }",
            errors: ["ES2020 field 'foo' is forbidden."],
        },
        {
            code: "class A { foo = 42 }",
            errors: ["ES2020 field 'foo' is forbidden."],
        },
        {
            code: "class A { static foo }",
            errors: ["ES2020 static field 'foo' is forbidden."],
        },
        {
            code: "class A { static foo = 42 }",
            errors: ["ES2020 static field 'foo' is forbidden."],
        },
        {
            code: "class A { [foo] }",
            errors: ["ES2020 field [foo] is forbidden."],
        },
        {
            code: "class A { [foo] = 42 }",
            errors: ["ES2020 field [foo] is forbidden."],
        },
        {
            code: "class A { static [foo] }",
            errors: ["ES2020 static field [foo] is forbidden."],
        },
        {
            code: "class A { static [foo] = 42 }",
            errors: ["ES2020 static field [foo] is forbidden."],
        },
        {
            code: "class A { #foo }",
            errors: ["ES2020 private field #foo is forbidden."],
        },
        {
            code: "class A { #foo = 42 }",
            errors: ["ES2020 private field #foo is forbidden."],
        },
        {
            code: "class A { static #foo }",
            errors: ["ES2020 static private field #foo is forbidden."],
        },
        {
            code: "class A { static #foo = 42 }",
            errors: ["ES2020 static private field #foo is forbidden."],
        },
        {
            code: `class A {
                #a
                #b () {}

                fn() {
                    this.#a;
                    x = this.#a;
                    this.#a++;
                    this.#a = x;

                    this.#b();
                }
            }`,
            errors: [
                {
                    message: "ES2020 private field #a is forbidden.",
                    line: 2,
                },
                {
                    message: "ES2020 private method #b is forbidden.",
                    line: 3,
                },
                {
                    message: "ES2020 private access #a is forbidden.",
                    line: 6,
                },
                {
                    message: "ES2020 private access #a is forbidden.",
                    line: 7,
                },
                {
                    message: "ES2020 private access #a is forbidden.",
                    line: 8,
                },
                {
                    message: "ES2020 private access #a is forbidden.",
                    line: 9,
                },
                {
                    message: "ES2020 private method call #b() is forbidden.",
                    line: 11,
                },
            ],
        },
        {
            code: `class A {
                static #c
                static #d

                fn() {
                    A.#c;
                    x = A.#c;
                    A.#c++;
                    A.#c = x;

                    A.#d();
                }
            }`,
            errors: [
                {
                    message: "ES2020 static private field #c is forbidden.",
                    line: 2,
                },
                {
                    message: "ES2020 static private field #d is forbidden.",
                    line: 3,
                },
                {
                    message: "ES2020 private access #c is forbidden.",
                    line: 6,
                },
                {
                    message: "ES2020 private access #c is forbidden.",
                    line: 7,
                },
                {
                    message: "ES2020 private access #c is forbidden.",
                    line: 8,
                },
                {
                    message: "ES2020 private access #c is forbidden.",
                    line: 9,
                },
                {
                    message: "ES2020 private method call #d() is forbidden.",
                    line: 11,
                },
            ],
        },
    ],
})
