/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-string-prototype-endswith"
const ruleId = "no-string-prototype-endswith"

new RuleTester().run(ruleId, rule, {
    valid: [
        "endsWith('a')",
        "foo.charAt(0)",
        "foo.endsWith('a')",
        { code: "endsWith('a')", settings: { "es-x": { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.endsWith('a')",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.endsWith('a')",
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
        },
        {
            code: "foo.endsWith('a')",
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.endsWith('a')",
            options: [{ aggressive: true }],
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
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
        { filename, code: "endsWith('a')" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.endsWith('a')" },
        { filename, code: "let foo = {}; foo.endsWith('a')" },
        {
            filename,
            code: "endsWith('a')",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.charAt(0)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.endsWith('a')",
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.endsWith('a')",
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
        },
        {
            filename,
            code: "let foo = String(); foo.endsWith('a')",
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.endsWith('a') }",
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.endsWith('a') }",
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
        },
        {
            filename,
            code: "foo.endsWith('a')",
            errors: ["ES2015 'String.prototype.endsWith' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
