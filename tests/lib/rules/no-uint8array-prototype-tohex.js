"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-uint8array-prototype-tohex.js")
const ruleId = "no-uint8array-prototype-tohex"

const method = "toHex"

new RuleTester().run(ruleId, rule, {
    valid: [
        `${method}(other)`,
        `foo.${method}(other)`,
        "foo.includes(other)",
        {
            code: `${method}(other)`,
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.includes(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: `${method}(other)`,
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: `foo.${method}(other)`,
            errors: [
                `ES2026 'Uint8Array.prototype.${method}' method is forbidden.`,
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: `foo.${method}(other)`,
            options: [{ aggressive: true }],
            errors: [
                `ES2026 'Uint8Array.prototype.${method}' method is forbidden.`,
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: `
            const t = new Uint8Array([])
            if (Uint8Array.prototype.${method}) {
                console.log(t.${method}(other))
            }
            if (typeof Uint8Array.prototype.${method} === 'undefined') {
                console.log(t.${method}(other))
            } else {
                console.log(t.${method}(other))
            }
            const a = Uint8Array.prototype.${method}
              ? t.${method}(other)
              : t.${method}(other);`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 7,
                    message: `ES2026 'Uint8Array.prototype.${method}' method is forbidden.`,
                },
                {
                    line: 13,
                    message: `ES2026 'Uint8Array.prototype.${method}' method is forbidden.`,
                },
            ],
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
        { filename, code: `${method}(other)` },
        { filename, code: "foo.includes(other)" },
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
            code: "foo.includes(other)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: `let foo = new Uint8Array(); foo.${method}(other)`,
            errors: [
                `ES2026 'Uint8Array.prototype.${method}' method is forbidden.`,
            ],
        },
        {
            filename,
            code: `function f<T extends Uint8Array>(a: T) { a.${method}(other) }`,
            errors: [
                `ES2026 'Uint8Array.prototype.${method}' method is forbidden.`,
            ],
        },
        {
            filename,
            code: `foo.${method}(other)`,
            errors: [
                `ES2026 'Uint8Array.prototype.${method}' method is forbidden.`,
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
