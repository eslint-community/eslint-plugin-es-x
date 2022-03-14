"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-trimleft-trimright.js")
const ruleId = "no-string-prototype-trimleft-trimright"

const USE_GLOBAL_ID = `
trimLeft(2)
trimRight(2)
`
const WITH_ID_FOO = `
foo.trimLeft(2)
foo.trimRight(2)
`
const WITH_ID_A = `
a.trimLeft(2)
a.trimRight(2)
`
const WITH_STRING = `
'foo'.trimLeft(2)
'foo'.trimRight(2)
`

const FIX_FOR_WITH_ID_FOO = `
foo.trimStart(2)
foo.trimEnd(2)
`
const FIX_FOR_WITH_ID_A = `
a.trimStart(2)
a.trimEnd(2)
`
const FIX_FOR_WITH_STRING = `
'foo'.trimStart(2)
'foo'.trimEnd(2)
`

const FULL_ERRORS = [
    "Annex B feature 'String.prototype.trimLeft' method is forbidden.",
    "Annex B feature 'String.prototype.trimRight' method is forbidden.",
]

function createSuggestions(code, errorIndex) {
    const output =
        errorIndex === 0
            ? code.replace("trimLeft", "trimStart")
            : code.replace("trimRight", "trimEnd")
    const desc =
        errorIndex === 0 ? "Replace with 'trimStart'" : "Replace with 'trimEnd'"

    return [{ desc, output }]
}

new RuleTester().run(ruleId, rule, {
    valid: [
        USE_GLOBAL_ID,
        "foo.charAt(0)",
        WITH_ID_FOO,
        {
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.charAt(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: WITH_ID_FOO,
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: WITH_STRING,
            output: FIX_FOR_WITH_STRING,
            errors: FULL_ERRORS,
        },
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
const parser = require.resolve("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({ parser }).run(`${ruleId} TS`, rule, {
    valid: [
        { filename, code: USE_GLOBAL_ID },
        { filename, code: "foo.charAt(0)" },
        { filename, code: WITH_ID_FOO },
        { filename, code: `let foo = {}; ${WITH_ID_FOO}` },
        {
            filename,
            code: USE_GLOBAL_ID,
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.charAt(0)",
            settings: { "es-x": { aggressive: true } },
        },

        // `String` is unknown type if tsconfig.json is not configured.
        { filename, code: `let foo = String(); ${WITH_ID_FOO}` },
    ],
    invalid: [
        {
            filename,
            code: WITH_STRING,
            output: FIX_FOR_WITH_STRING,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `let foo = 'foo'; ${WITH_ID_FOO}`,
            output: `let foo = 'foo'; ${FIX_FOR_WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends string>(a: T) { ${WITH_ID_A} }`,
            output: `function f<T extends string>(a: T) { ${FIX_FOR_WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends 'a' | 'b'>(a: T) { ${WITH_ID_A} }`,
            output: `function f<T extends 'a' | 'b'>(a: T) { ${FIX_FOR_WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `let foo = String(); ${WITH_ID_FOO}`,
            output: null,
            errors: FULL_ERRORS.map((message, i) => ({
                message,
                suggestions: createSuggestions(
                    `let foo = String(); ${WITH_ID_FOO}`,
                    i,
                ),
            })),
            settings: { "es-x": { aggressive: true } },
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

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: USE_GLOBAL_ID },
            { filename, code: "foo.charAt(0)" },
            { filename, code: WITH_ID_FOO },
            { filename, code: `let foo = {}; ${WITH_ID_FOO}` },
            {
                filename,
                code: USE_GLOBAL_ID,
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
                code: WITH_STRING,
                output: FIX_FOR_WITH_STRING,
                errors: FULL_ERRORS,
            },
            {
                filename,
                code: `let foo = 'foo'; ${WITH_ID_FOO}`,
                output: `let foo = 'foo'; ${FIX_FOR_WITH_ID_FOO}`,
                errors: FULL_ERRORS,
            },
            {
                filename,
                code: `let foo = String(); ${WITH_ID_FOO}`,
                output: `let foo = String(); ${FIX_FOR_WITH_ID_FOO}`,
                errors: FULL_ERRORS,
            },
            {
                filename,
                code: `function f<T extends string>(a: T) { ${WITH_ID_A} }`,
                output: `function f<T extends string>(a: T) { ${FIX_FOR_WITH_ID_A} }`,
                errors: FULL_ERRORS,
            },
            {
                filename,
                code: `function f<T extends 'a' | 'b'>(a: T) {${WITH_ID_A} }`,
                output: `function f<T extends 'a' | 'b'>(a: T) {${FIX_FOR_WITH_ID_A} }`,
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
    },
)
