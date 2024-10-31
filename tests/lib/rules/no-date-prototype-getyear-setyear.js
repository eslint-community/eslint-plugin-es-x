"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-date-prototype-getyear-setyear.js")
const ruleId = "no-date-prototype-getyear-setyear"

const USE_GLOBAL_ID = `
getYear()
setYear(2)
`
const WITH_ID_FOO = `
foo.getYear()
foo.setYear(2)
`
const WITH_ID_A = `
a.getYear()
a.setYear(2)
`

const FULL_ERRORS = [
    "Annex B feature 'Date.prototype.getYear' method is forbidden.",
    "Annex B feature 'Date.prototype.setYear' method is forbidden.",
]

new RuleTester().run(ruleId, rule, {
    valid: [
        USE_GLOBAL_ID,
        "foo.getFullYear()",
        WITH_ID_FOO,
        {
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getFullYear()",
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
            disallowAutomaticSingleRunInference: false,
        },
    },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: USE_GLOBAL_ID },
        { filename, code: "foo.getFullYear()" },
        { filename, code: WITH_ID_FOO },
        { filename, code: `let foo = {}; ${WITH_ID_FOO}` },
        {
            filename,
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.getFullYear()",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: `let foo = new Date(); ${WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends Date>(a: T) { ${WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends Date | 'b'>(a: T) {${WITH_ID_A} }`,
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
