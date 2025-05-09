/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-prototype-flags.js")
const ruleId = "no-regexp-prototype-flags"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo.global",
        "foo.flags",
        { code: "foo.global", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.flags",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: `
            const re = /a/
            if (typeof re.flags === "string") {
                console.log(re.flags)
            }`,
            options: [{ allowTestedProperty: true }],
        },
        {
            code: `
            const re = /a/
            if (typeof re.flags !== "undefined") {
                console.log(re.flags)
            }`,
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "foo.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.flags",
            options: [{ aggressive: true }],
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: `
            const re = /a/
            if (typeof re.flags === "string") {
                console.log(re.flags)
            }`,
            errors: 2,
        },
        {
            code: `
            const re = /a/
            if (re.flags) {
                console.log(re.flags)
            }`,
            options: [{ allowTestedProperty: true }],
            errors: 2,
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
        { filename, code: "foo.global" },
        { filename, code: "foo.flags" },
        { filename, code: "let foo = {}; foo.flags" },
        {
            filename,
            code: "foo.global",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "/foo/.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
        },
        {
            filename,
            code: "new RegExp('').flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
        },
        {
            filename,
            code: "let foo = new RegExp(''); foo.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
        },
        {
            filename,
            code: "foo.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
