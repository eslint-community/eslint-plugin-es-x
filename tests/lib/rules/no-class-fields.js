/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-class-fields.js")
const ruleId = "no-class-fields"

if (!RuleTester.isSupported(2022)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-class-fields.")
    return
}

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
    ],
    invalid: [
        {
            code: "class A { #foo() {} }",
            errors: ["ES2022 private method #foo is forbidden."],
        },
        {
            code: "class A { get #foo() {} }",
            errors: ["ES2022 private getter #foo is forbidden."],
        },
        {
            code: "class A { set #foo(v) {} }",
            errors: ["ES2022 private setter #foo is forbidden."],
        },
        {
            code: "class A { *#foo() {} }",
            errors: ["ES2022 private generator method #foo is forbidden."],
        },
        {
            code: "class A { async #foo() {} }",
            errors: ["ES2022 private async method #foo is forbidden."],
        },
        {
            code: "class A { static #foo() {} }",
            errors: ["ES2022 static private method #foo is forbidden."],
        },
        {
            code: "class A { static get #foo() {} }",
            errors: ["ES2022 static private getter #foo is forbidden."],
        },
        {
            code: "class A { static set #foo(v) {} }",
            errors: ["ES2022 static private setter #foo is forbidden."],
        },
        {
            code: "class A { static *#foo() {} }",
            errors: [
                "ES2022 static private generator method #foo is forbidden.",
            ],
        },
        {
            code: "class A { static async #foo() {} }",
            errors: ["ES2022 static private async method #foo is forbidden."],
        },

        {
            code: "class A { foo }",
            errors: ["ES2022 field 'foo' is forbidden."],
        },
        {
            code: "class A { foo = 42 }",
            errors: ["ES2022 field 'foo' is forbidden."],
        },
        {
            code: "class A { static foo }",
            errors: ["ES2022 static field 'foo' is forbidden."],
        },
        {
            code: "class A { static foo = 42 }",
            errors: ["ES2022 static field 'foo' is forbidden."],
        },
        {
            code: "class A { [foo] }",
            errors: ["ES2022 field [foo] is forbidden."],
        },
        {
            code: "class A { [foo] = 42 }",
            errors: ["ES2022 field [foo] is forbidden."],
        },
        {
            code: "class A { static [foo] }",
            errors: ["ES2022 static field [foo] is forbidden."],
        },
        {
            code: "class A { static [foo] = 42 }",
            errors: ["ES2022 static field [foo] is forbidden."],
        },
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
            errors: ["ES2022 static private field #foo is forbidden."],
        },
        {
            code: "class A { static #foo = 42 }",
            errors: ["ES2022 static private field #foo is forbidden."],
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
                    message: "ES2022 private method #b is forbidden.",
                    line: 3,
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
                    message: "ES2022 static private field #c is forbidden.",
                    line: 2,
                },
                {
                    message: "ES2022 static private field #d is forbidden.",
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
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require.resolve("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Types`,
    rule,
    {
        valid: [{ filename, code: "class A { declare foo: string }" }],
        invalid: [
            {
                filename,
                code: "class A { readonly foo = '' }",
                errors: ["ES2022 field 'foo' is forbidden."],
            },
            {
                filename,
                code: "class A { foo: string }",
                errors: ["ES2022 field 'foo' is forbidden."],
            },
            {
                filename,
                code: "class A { foo: string = '' }",
                errors: ["ES2022 field 'foo' is forbidden."],
            },
        ],
    },
)
