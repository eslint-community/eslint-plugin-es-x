/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-class-instance-fields.js")
const ruleId = "no-class-instance-fields"

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
        "class A { static foo }",
        "class A { static foo = 42 }",
        "class A { static [foo] }",
        "class A { static [foo] = 42 }",
        "class A { static #foo }",
        "class A { static #foo = 42 }",
        `class A {
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
    ],
    invalid: [
        {
            code: "class A { foo }",
            errors: ["ES2022 instance field 'foo' is forbidden."],
        },
        {
            code: "class A { foo = 42 }",
            errors: ["ES2022 instance field 'foo' is forbidden."],
        },
        {
            code: "class A { [foo] }",
            errors: ["ES2022 instance field [foo] is forbidden."],
        },
        {
            code: "class A { [foo] = 42 }",
            errors: ["ES2022 instance field [foo] is forbidden."],
        },
        {
            code: "class A { #foo }",
            errors: ["ES2022 instance field #foo is forbidden."],
        },
        {
            code: "class A { #foo = 42 }",
            errors: ["ES2022 instance field #foo is forbidden."],
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
                    message: "ES2022 instance field #a is forbidden.",
                    line: 2,
                },
            ],
        },
        {
            code: "class A { readonly foo = '' }",
            errors: ["ES2022 instance field 'foo' is forbidden."],
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "class A { foo: string }",
            errors: ["ES2022 instance field 'foo' is forbidden."],
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "class A { foo: string = '' }",
            errors: ["ES2022 instance field 'foo' is forbidden."],
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
        {
            code: "class A { #foo: string }",
            errors: ["ES2022 instance field #foo is forbidden."],
            languageOptions: { parser: require("@typescript-eslint/parser") },
        },
    ],
})
