"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-weakmap-prototype-getorinsertcomputed.js")
const ruleId = "no-weakmap-prototype-getorinsertcomputed"

const method = "getOrInsertComputed"

new RuleTester().run(ruleId, rule, {
    valid: [
        `${method}(key, callbackFn)`,
        `foo.${method}(key, callbackFn)`,
        "foo.set(key, value)",
        {
            code: `${method}(key, callbackFn)`,
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.set(key, value)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: `${method}(key, callbackFn)`,
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: `foo.${method}(key, callbackFn)`,
            errors: [
                `ES2026 'WeakMap.prototype.${method}' method is forbidden.`,
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: `foo.${method}(key, callbackFn)`,
            options: [{ aggressive: true }],
            errors: [
                `ES2026 'WeakMap.prototype.${method}' method is forbidden.`,
            ],
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
    languageOptions: {
        parser,
        parserOptions: {
            tsconfigRootDir,
            project,
            disallowAutomaticSingleRunInference: true,
        },
    },
}).run(`${ruleId} TS Full Types`, rule, {
    valid: [
        { filename, code: `${method}(key, callbackFn)` },
        { filename, code: "foo.set(key, value)" },
        {
            filename,
            code: `foo.${method}(key, callbackFn)`,
        },
        {
            filename,
            code: `let foo = {}; foo.${method}(key, callbackFn)`,
        },
        {
            filename,
            code: `${method}(key, callbackFn)`,
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.set(key, value)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: `let foo = new WeakMap(); foo.${method}(key, callbackFn)`,
            errors: [
                `ES2026 'WeakMap.prototype.${method}' method is forbidden.`,
            ],
        },
        {
            filename,
            code: `function f<T extends WeakMap<object, number>>(a: T) { a.${method}(key, callbackFn) }`,
            errors: [
                `ES2026 'WeakMap.prototype.${method}' method is forbidden.`,
            ],
        },
        {
            filename,
            code: `foo.${method}(key, callbackFn)`,
            errors: [
                `ES2026 'WeakMap.prototype.${method}' method is forbidden.`,
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
