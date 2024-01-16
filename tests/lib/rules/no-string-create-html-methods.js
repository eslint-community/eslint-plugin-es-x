"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-create-html-methods.js")
const ruleId = "no-string-create-html-methods"

const USE_GLOBAL_ID = `
anchor("nm")
big()
blink()
bold()
fixed()
fontcolor("red")
fontsize(7)
italics()
link("https://example.com/")
small()
strike()
sub()
sup()
`
const WITH_ID_FOO = `
foo.anchor("nm")
foo.big()
foo.blink()
foo.bold()
foo.fixed()
foo.fontcolor("red")
foo.fontsize(7)
foo.italics()
foo.link("https://example.com/")
foo.small()
foo.strike()
foo.sub()
foo.sup()
`
const WITH_ID_A = `
a.anchor("nm")
a.big()
a.blink()
a.bold()
a.fixed()
a.fontcolor("red")
a.fontsize(7)
a.italics()
a.link("https://example.com/")
a.small()
a.strike()
a.sub()
a.sup()
`
const WITH_STRING = `
'foo'.anchor("nm")
'foo'.big()
'foo'.blink()
'foo'.bold()
'foo'.fixed()
'foo'.fontcolor("red")
'foo'.fontsize(7)
'foo'.italics()
'foo'.link("https://example.com/")
'foo'.small()
'foo'.strike()
'foo'.sub()
'foo'.sup()
`

const FULL_ERRORS = [
    "Annex B feature 'String.prototype.anchor' method is forbidden.",
    "Annex B feature 'String.prototype.big' method is forbidden.",
    "Annex B feature 'String.prototype.blink' method is forbidden.",
    "Annex B feature 'String.prototype.bold' method is forbidden.",
    "Annex B feature 'String.prototype.fixed' method is forbidden.",
    "Annex B feature 'String.prototype.fontcolor' method is forbidden.",
    "Annex B feature 'String.prototype.fontsize' method is forbidden.",
    "Annex B feature 'String.prototype.italics' method is forbidden.",
    "Annex B feature 'String.prototype.link' method is forbidden.",
    "Annex B feature 'String.prototype.small' method is forbidden.",
    "Annex B feature 'String.prototype.strike' method is forbidden.",
    "Annex B feature 'String.prototype.sub' method is forbidden.",
    "Annex B feature 'String.prototype.sup' method is forbidden.",
]

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
    languageOptions: { parser, parserOptions: { tsconfigRootDir, project } },
}).run(`${ruleId} TS Full Type Information`, rule, {
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
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `let foo = 'foo'; ${WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `let foo = String(); ${WITH_ID_FOO}`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends string>(a: T) { ${WITH_ID_A} }`,
            errors: FULL_ERRORS,
        },
        {
            filename,
            code: `function f<T extends 'a' | 'b'>(a: T) {${WITH_ID_A} }`,
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
