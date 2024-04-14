"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-set-operation-methods.js")
const ruleId = "no-string-prototype-codepointat"

const methods = [
    "union",
    "intersection",
    "difference",
    "symmetricDifference",
    "isSubsetOf",
    "isSupersetOf",
    "isDisjointFrom",
]

new RuleTester().run(ruleId, rule, {
    valid: [
        ...methods.map((method) => `${method}(other)`),
        ...methods.map((method) => `foo.${method}(other)`),
        "foo.add(other)",
        ...methods.map((method) => ({
            code: `${method}(other)`,
            settings: { "es-x": { aggressive: true } },
        })),
        { code: "foo.add(0)", settings: { "es-x": { aggressive: true } } },
        ...methods.map((method) => ({
            code: `${method}(other)`,
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        })),
    ],
    invalid: [
        ...methods.map((method) => ({
            code: `foo.${method}(other)`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: true } },
        })),
        ...methods.map((method) => ({
            code: `foo.${method}(other)`,
            options: [{ aggressive: true }],
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: false } },
        })),
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({
    languageOptions: { parser, parserOptions: { tsconfigRootDir, project } },
}).run(`${ruleId} TS Full Types`, rule, {
    valid: [
        ...methods.map((method) => ({ filename, code: `${method}(other)` })),
        { filename, code: "foo.add(other)" },
        ...methods.map((method) => ({
            filename,
            code: `foo.${method}(other)`,
        })),
        ...methods.map((method) => ({
            filename,
            code: `let foo = {}; foo.${method}(other)`,
        })),
        ...methods.map((method) => ({
            filename,
            code: `${method}(other)`,
            settings: { "es-x": { aggressive: true } },
        })),
        {
            filename,
            code: "foo.add(other)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        ...methods.map((method) => ({
            filename,
            code: `let foo = new Set(); foo.${method}(other)`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
        })),
        ...methods.map((method) => ({
            only: true,
            filename,
            code: `function f<T extends Set<string>>(a: T) { a.${method}(other) }`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
        })),
        ...methods.map((method) => ({
            only: true,
            filename,
            code: `function f<T extends Set>(a: T) { a.${method}(other) }`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
        })),
        ...methods.map((method) => ({
            filename,
            code: `foo.${method}(other)`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: true } },
        })),
    ],
})
