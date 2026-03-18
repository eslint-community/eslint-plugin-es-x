/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-array-prototype-indexof"
const ruleId = "no-array-prototype-indexof"

new RuleTester().run(ruleId, rule, {
    valid: [
        "indexOf(0)",
        "foo.reverse()",
        "foo.indexOf(0)",
        { code: "indexOf(0)", settings: { "es-x": { aggressive: true } } },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.indexOf(0)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.indexOf(0)",
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.indexOf(0)",
            options: [{ aggressive: true }],
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
            settings: { "es-x": { aggressive: false } },
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
import * as parser from "@typescript-eslint/parser"
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({
    languageOptions: {
        parser,
        parserOptions: {
            tsconfigRootDir,
            project,
            disallowAutomaticSingleRunInference: true,
        },
    },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "indexOf(0)" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.indexOf(0)" },
        { filename, code: "let foo = {}; foo.indexOf(0)" },
        {
            filename,
            code: "indexOf(0)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].indexOf(0)",
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.indexOf(0)",
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Array(); foo.indexOf(0)",
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.indexOf(0) }",
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends readonly any[]>(a: T) { a.indexOf(0) }",
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.indexOf(0) }",
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
        },
        {
            filename,
            code: "foo.indexOf(0)",
            errors: ["ES5 'Array.prototype.indexOf' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
