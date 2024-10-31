"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-prototype-compile.js")
const ruleId = "no-regexp-prototype-compile"

const USE_GLOBAL_ID = `
compile("foo")
`
const WITH_ID_FOO = `
foo.compile("foo")
`
const WITH_ID_A = `
a.compile("foo")
`
const WITH_REGEXP = `
/foo/.compile("foo")
`

const FULL_ERRORS = [
    "Annex B feature 'RegExp.prototype.compile' method is forbidden.",
]

new RuleTester().run(ruleId, rule, {
    valid: [
        USE_GLOBAL_ID,
        "foo.global",
        WITH_ID_FOO,
        {
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.global", settings: { "es-x": { aggressive: true } } },
        {
            code: WITH_ID_FOO,
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: WITH_REGEXP,
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
        { filename, code: "foo.global" },
        { filename, code: WITH_ID_FOO },
        { filename, code: `let foo = {}; ${WITH_ID_FOO}` },
        {
            filename,
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.global",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: WITH_REGEXP,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `let foo = /foo/; ${WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `let foo = new RegExp(); ${WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends RegExp>(a: T) { ${WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends RegExp | 'b'>(a: T) {${WITH_ID_A} }`,
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
