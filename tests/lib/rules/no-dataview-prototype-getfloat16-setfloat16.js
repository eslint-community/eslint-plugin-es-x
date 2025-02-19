"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-dataview-prototype-getfloat16-setfloat16.js")
const ruleId = "no-dataview-prototype-getfloat16-setfloat16"

const USE_GLOBAL_ID = `
getFloat16()
setFloat16(2)
`
const WITH_ID_FOO = `
foo.getFloat16()
foo.setFloat16(2)
`
const WITH_ID_A = `
a.getFloat16()
a.setFloat16(2)
`

const FULL_ERRORS = [
    "ES2025 'DataView.prototype.getFloat16' method is forbidden.",
    "ES2025 'DataView.prototype.setFloat16' method is forbidden.",
]

new RuleTester().run(ruleId, rule, {
    valid: [
        USE_GLOBAL_ID,
        "foo.getFloat32()",
        WITH_ID_FOO,
        {
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getFloat32()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: WITH_ID_FOO,
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: `let foo = new DataView(); ${WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            code: WITH_ID_FOO,
            errors: FULL_ERRORS,
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: WITH_ID_FOO,
            options: [{ aggressive: true }],
            errors: FULL_ERRORS,
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
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: USE_GLOBAL_ID },
        { filename, code: "foo.getFloat32()" },
        { filename, code: WITH_ID_FOO },
        { filename, code: `let foo = {}; ${WITH_ID_FOO}` },
        {
            filename,
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.getFloat32()",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: `let foo = new DataView(); ${WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends DataView>(a: T) { ${WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends DataView | 'b'>(a: T) {${WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: WITH_ID_FOO,
            errors: FULL_ERRORS,
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
