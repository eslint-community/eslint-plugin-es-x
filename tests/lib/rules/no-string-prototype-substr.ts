import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-string-prototype-substr"
const ruleId = "no-string-prototype-substr"

new RuleTester().run(ruleId, rule, {
    valid: [
        "substr()",
        "foo.charAt(0)",
        "foo.substr()",
        { code: "substr()", settings: { "es-x": { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.substr()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.substr()",
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
        },
        {
            code: "foo.substr()",
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.substr()",
            options: [{ aggressive: true }],
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
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
        { filename, code: "substr()" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.substr()" },
        { filename, code: "let foo = {}; foo.substr()" },
        {
            filename,
            code: "substr()",
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
            code: "'foo'.substr()",
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.substr()",
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = String(); foo.substr()",
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.substr() }",
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.substr() }",
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.substr()",
            errors: [
                "Annex B feature 'String.prototype.substr' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
