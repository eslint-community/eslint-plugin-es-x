/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-array-prototype-entries"
const ruleId = "no-array-prototype-entries"

new RuleTester().run(ruleId, rule, {
    valid: [
        "entries()",
        "foo.reverse()",
        "foo.entries()",
        { code: "entries()", settings: { "es-x": { aggressive: true } } },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.entries()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.entries()",
            options: [{ aggressive: true }],
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
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
        { filename, code: "entries()" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.entries()" },
        { filename, code: "let foo = {}; foo.entries()" },
        {
            filename,
            code: "entries()",
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
            code: "[a, b, c].entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Array(); foo.entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.entries() }",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends readonly any[]>(a: T) { a.entries() }",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.entries() }",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
        },
        {
            filename,
            code: "foo.entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
