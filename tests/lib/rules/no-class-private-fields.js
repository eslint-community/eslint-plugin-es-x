/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-class-private-fields.js")
const ruleId = "no-class-private-fields"

new RuleTester().run(ruleId, rule, {
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
        "class A { foo }",
        "class A { foo = 42 }",
        "class A { static foo }",
        "class A { static foo = 42 }",
        "class A { [foo] }",
        "class A { [foo] = 42 }",
        "class A { static [foo] }",
        "class A { static [foo] = 42 }",
        "class A { #foo() {} }",
        "class A { get #foo() {} }",
        "class A { set #foo(v) {} }",
        "class A { *#foo() {} }",
        "class A { async #foo() {} }",
        "class A { static #foo() {} }",
        "class A { static get #foo() {} }",
        "class A { static set #foo(v) {} }",
        "class A { static *#foo() {} }",
        "class A { static async #foo() {} }",
        {
            code: "class A { declare foo: string }",
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "class A { declare #foo: string }",
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "declare class A { foo: string }",
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "declare class A { #foo: string }",
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "class A { readonly foo = '' }",
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "class A { foo: string }",
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "class A { foo: string = '' }",
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
    ],
    invalid: [
        {
            code: "class A { #foo }",
            errors: ["ES2022 private field #foo is forbidden."],
        },
        {
            code: "class A { #foo = 42 }",
            errors: ["ES2022 private field #foo is forbidden."],
        },
        {
            code: "class A { static #foo }",
            errors: ["ES2022 private field #foo is forbidden."],
        },
        {
            code: "class A { static #foo = 42 }",
            errors: ["ES2022 private field #foo is forbidden."],
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
                    message: "ES2022 private field #a is forbidden.",
                    line: 2,
                },
                {
                    message: "ES2022 private access #a is forbidden.",
                    line: 6,
                },
                {
                    message: "ES2022 private access #a is forbidden.",
                    line: 7,
                },
                {
                    message: "ES2022 private access #a is forbidden.",
                    line: 8,
                },
                {
                    message: "ES2022 private access #a is forbidden.",
                    line: 9,
                },
                {
                    message: "ES2022 private method call #b() is forbidden.",
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
                    message: "ES2022 private field #c is forbidden.",
                    line: 2,
                },
                {
                    message: "ES2022 private field #d is forbidden.",
                    line: 3,
                },
                {
                    message: "ES2022 private access #c is forbidden.",
                    line: 6,
                },
                {
                    message: "ES2022 private access #c is forbidden.",
                    line: 7,
                },
                {
                    message: "ES2022 private access #c is forbidden.",
                    line: 8,
                },
                {
                    message: "ES2022 private access #c is forbidden.",
                    line: 9,
                },
                {
                    message: "ES2022 private method call #d() is forbidden.",
                    line: 11,
                },
            ],
        },
        {
            code: "class A { #foo: string }",
            errors: ["ES2022 private field #foo is forbidden."],
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
    ],
})
