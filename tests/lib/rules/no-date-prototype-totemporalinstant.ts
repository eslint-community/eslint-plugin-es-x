import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-date-prototype-totemporalinstant"
import * as parser from "@typescript-eslint/parser"
const ruleId = "no-date-prototype-totemporalinstant"

new RuleTester().run(ruleId, rule, {
    valid: [
        "toTemporalInstant",
        "foo.toTemporalInstant",
        {
            code: "toTemporalInstant",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.toString", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toTemporalInstant",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.toTemporalInstant",
            errors: [
                "ES2026 'Date.prototype.toTemporalInstant' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toTemporalInstant",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 'Date.prototype.toTemporalInstant' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Date(); foo.toTemporalInstant",
            errors: [
                "ES2026 'Date.prototype.toTemporalInstant' method is forbidden.",
            ],
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
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
        { filename, code: "toTemporalInstant" },
        { filename, code: "foo.toString" },
        { filename, code: "foo.toTemporalInstant" },
        { filename, code: "let foo = {}; foo.toTemporalInstant" },
        {
            filename,
            code: "toTemporalInstant",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.toString",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "(new Date()).toTemporalInstant",
            errors: [
                "ES2026 'Date.prototype.toTemporalInstant' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Date(); foo.toTemporalInstant",
            errors: [
                "ES2026 'Date.prototype.toTemporalInstant' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Date>(a: T) { a.toTemporalInstant }",
            errors: [
                "ES2026 'Date.prototype.toTemporalInstant' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.toTemporalInstant",
            errors: [
                "ES2026 'Date.prototype.toTemporalInstant' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
