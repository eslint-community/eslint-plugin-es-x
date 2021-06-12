/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-top-level-await.js")

// if (!RuleTester.isSupported(2022)) {
//     //eslint-disable-next-line no-console
//     console.log("Skip the tests of no-top-level-await.")
//     return
// }

new RuleTester({
    parser: require.resolve("espree"), // espree v8.0.0-beta.x
    parserOptions: {
        ecmaVersion: 2022,
    },
}).run("no-top-level-await", rule, {
    valid: [
        "async function f() { await expr }",
        "expr;",
        "const f = async function() { await expr }",
        "const f = async () => { await expr }",
        "({ async method() { await expr } })",
        "class A { async method() { await expr } }",
        "(class { async method() { await expr } })",
        "async function f() { for await (a of b); }",
        "async function f() { for await (var a of b); }",
        "async function f() { for await (let a of b); }",
        "async function f() { for await (const a of b); }",
        "function f() { async function f() { await expr } }",
    ],
    invalid: [
        {
            code: "await expr",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: "for await (a of b);",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: "for await (var a of b);",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: "for await (let a of b);",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: "for await (const a of b);",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: `
            await expr
            async function f() {
                await expr
            }
            await expr`,
            errors: [
                {
                    message: "ES2022 top-level 'await' is forbidden.",
                    line: 2,
                },
                {
                    message: "ES2022 top-level 'await' is forbidden.",
                    line: 6,
                },
            ],
        },
        {
            code: `
            await expr
            async function f() {
                await expr
                async function f() {
                    await expr
                }
            }
            await expr`,
            errors: [
                {
                    message: "ES2022 top-level 'await' is forbidden.",
                    line: 2,
                },
                {
                    message: "ES2022 top-level 'await' is forbidden.",
                    line: 9,
                },
            ],
        },
        {
            code: `
            let jQuery;
            try {
              jQuery = await import('https://cdn-a.com/jQuery');
            } catch {
              jQuery = await import('https://cdn-b.com/jQuery');
            }`,
            errors: [
                {
                    message: "ES2022 top-level 'await' is forbidden.",
                    line: 4,
                },
                {
                    message: "ES2022 top-level 'await' is forbidden.",
                    line: 6,
                },
            ],
        },
        {
            code: "{ await expr }",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: "( await expr )",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: "fn( await expr )",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: "if (foo) { await expr }",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
        {
            code: "for (const foo of bar) { await expr }",
            errors: ["ES2022 top-level 'await' is forbidden."],
        },
    ],
})
