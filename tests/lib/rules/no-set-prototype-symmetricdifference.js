"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-set-prototype-symmetricdifference.js")
const ruleId = "no-set-prototype-symmetricdifference"

const method = "symmetricDifference"

new RuleTester().run(ruleId, rule, {
    valid: [
        `${method}(other)`,
        `foo.${method}(other)`,
        "foo.add(other)",
        {
            code: `${method}(other)`,
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.add(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: `${method}(other)`,
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: `foo.${method}(other)`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: `foo.${method}(other)`,
            options: [{ aggressive: true }],
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: false } },
        },
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
        { filename, code: `${method}(other)` },
        { filename, code: "foo.add(other)" },
        {
            filename,
            code: `foo.${method}(other)`,
        },
        {
            filename,
            code: `let foo = {}; foo.${method}(other)`,
        },
        {
            filename,
            code: `${method}(other)`,
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.add(other)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: `let foo = new Set(); foo.${method}(other)`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
        },
        {
            filename,
            code: `function f<T extends Set<string>>(a: T) { a.${method}(other) }`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
        },
        {
            filename,
            code: `foo.${method}(other)`,
            errors: [`ES2025 'Set.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
