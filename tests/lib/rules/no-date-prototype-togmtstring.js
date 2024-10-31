"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-date-prototype-togmtstring.js")
const ruleId = "no-date-prototype-togmtstring"

const USE_GLOBAL_ID = `
toGMTString()
`
const WITH_ID_FOO = `
foo.toGMTString()
`
const WITH_ID_A = `
a.toGMTString()
`

const FIX_FOR_WITH_ID_FOO = `
foo.toUTCString()
`
const FIX_FOR_WITH_ID_A = `
a.toUTCString()
`

const FULL_ERRORS = [
    "Annex B feature 'Date.prototype.toGMTString' method is forbidden.",
]

function createSuggestions(code) {
    const output = code.replace("toGMTString", "toUTCString")
    const desc = "Replace with 'toUTCString'"

    return [{ desc, output }]
}

new RuleTester().run(ruleId, rule, {
    valid: [
        USE_GLOBAL_ID,
        "foo.toUTCString()",
        WITH_ID_FOO,
        {
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toUTCString()",
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
            output: null,
            errors: FULL_ERRORS.map((message, i) => ({
                message,
                suggestions: createSuggestions(WITH_ID_FOO, i),
            })),
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: WITH_ID_FOO,
            output: null,
            options: [{ aggressive: true }],
            errors: FULL_ERRORS.map((message, i) => ({
                message,
                suggestions: createSuggestions(WITH_ID_FOO, i),
            })),
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
        { filename, code: "foo.toUTCString()" },
        { filename, code: WITH_ID_FOO },
        { filename, code: `let foo = {}; ${WITH_ID_FOO}` },
        {
            filename,
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.toUTCString()",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: `let foo = new Date(); ${WITH_ID_FOO}`,
            output: `let foo = new Date(); ${FIX_FOR_WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends Date>(a: T) { ${WITH_ID_A} }`,
            output: `function f<T extends Date>(a: T) { ${FIX_FOR_WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends Date | 'b'>(a: T) {${WITH_ID_A} }`,
            output: `function f<T extends Date | 'b'>(a: T) {${FIX_FOR_WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: WITH_ID_FOO,
            output: null,
            errors: FULL_ERRORS.map((message, i) => ({
                message,
                suggestions: createSuggestions(WITH_ID_FOO, i),
            })),
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
