/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-symbol-prototype-description.js")
const ruleId = "no-symbol-prototype-description"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo.description",
        {
            code: "foo.description",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "Symbol().description",
            errors: [
                "ES2019 'Symbol.prototype.description' property is forbidden.",
            ],
        },
        {
            code: "foo.description",
            errors: [
                "ES2019 'Symbol.prototype.description' property is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.description",
            options: [{ aggressive: true }],
            errors: [
                "ES2019 'Symbol.prototype.description' property is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "Symbol.iterator.description",
            errors: [
                "ES2019 'Symbol.prototype.description' property is forbidden.",
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
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [{ filename, code: "foo.description" }],
    invalid: [
        {
            filename,
            code: "Symbol.iterator.description",
            errors: [
                "ES2019 'Symbol.prototype.description' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Symbol().description",
            errors: [
                "ES2019 'Symbol.prototype.description' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = Symbol(); foo.description",
            errors: [
                "ES2019 'Symbol.prototype.description' property is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.description",
            errors: [
                "ES2019 'Symbol.prototype.description' property is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
