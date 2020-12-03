/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-promise-prototype-finally.js")
const ruleId = "no-promise-prototype-finally"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo.then(() => {})",
        "foo.finally(() => {})",
        { code: "foo.then(() => {})", settings: { es: { aggressive: true } } },
        {
            code: "foo.finally(() => {})",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.finally(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
            settings: { es: { aggressive: false } },
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

new RuleTester({ parser }).run(`${ruleId} TS`, rule, {
    valid: [
        { filename, code: "foo.then(() => {})" },
        { filename, code: "foo.finally(() => {})" },
        { filename, code: "let foo = {}; foo.finally(() => {})" },
        {
            filename,
            code: "foo.then(() => {})",
            settings: { es: { aggressive: true } },
        },

        // `Promise` is unknown type if tsconfig.json is not configured.
        { filename, code: "async function f() {} f().finally(() => {})" },
        {
            filename,
            code: "let foo = Promise.resolve(); foo.finally(() => {})",
        },
    ],
    invalid: [
        {
            filename,
            code: "async function f() {} f().finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Promise.resolve(); foo.finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({
    parser,
    parserOptions: { tsconfigRootDir, project },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "foo.then(() => {})" },
        { filename, code: "foo.finally(() => {})" },
        { filename, code: "let foo = {}; foo.finally(() => {})" },
        {
            filename,
            code: "foo.then(() => {})",
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "async function f() {} f().finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
        },
        {
            filename,
            code: "async function f() {} let foo = f(); foo.finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Promise.resolve(); foo.finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
        },
        {
            filename,
            code: "Promise.resolve().finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
        },
        {
            filename,
            code: "Promise.resolve().then(() => {}).finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
        },
        {
            filename,
            code: "foo.finally(() => {})",
            errors: ["ES2018 'Promise.prototype.finally' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})
