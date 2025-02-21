/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-replaceall.js")
const ruleId = "no-string-prototype-replaceall"

new RuleTester().run(ruleId, rule, {
    valid: [
        "replaceAll('a')",
        "foo.charAt(0)",
        "foo.replaceAll('a')",
        { code: "replaceAll('a')", settings: { "es-x": { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.replaceAll('a')",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            code: "foo.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.replaceAll('a')",
            options: [{ aggressive: true }],
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            if (String.prototype.replaceAll) {
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll === 'undefined') {
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                console.log(str.replaceAll("dog", "monkey"))
            }
            const a = String.prototype.replaceAll
              ? str.replaceAll("dog", "monkey")
              : str.replaceAll("dog", "monkey");`,
            errors: 8,
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            if (String.prototype.replaceAll) {
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll === 'undefined') {
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                console.log(str.replaceAll("dog", "monkey"))
            }
            const a = String.prototype.replaceAll
              ? str.replaceAll("dog", "monkey")
              : str.replaceAll("dog", "monkey");`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 7,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 13,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            if (String.prototype.replaceAll) {
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll === 'undefined') {
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                console.log(str.replaceAll("dog", "monkey"))
            }
            const a = String.prototype.replaceAll
              ? str.replaceAll("dog", "monkey")
              : str.replaceAll("dog", "monkey");`,
            errors: [
                {
                    line: 7,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 13,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
            settings: { "es-x": { allowTestedProperty: true } },
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            if (String.prototype.replaceAll) {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (String.prototype.replaceAll) {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (!String.prototype.replaceAll) {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 12,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 16,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            if (typeof String.prototype.replaceAll !== 'undefined') {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll === 'undefined') {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll === 'function') {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll !== 'function') {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 9,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 19,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 23,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            if (typeof String.prototype.replaceAll != 'undefined') {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll == 'undefined') {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll == 'function') {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (typeof String.prototype.replaceAll != 'function') {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 9,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 19,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 23,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            if (String.prototype.replaceAll !== undefined) {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (String.prototype.replaceAll === undefined) {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (String.prototype.replaceAll == undefined) {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (String.prototype.replaceAll == null) {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            }
            if (String.prototype.replaceAll != null) {
                // OK
                console.log(str.replaceAll("dog", "monkey"))
            } else {
                // NG
                console.log(str.replaceAll("dog", "monkey"))
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 9,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 16,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 23,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 33,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            if (String.prototype.replaceAll !== null) {
                // NG: The guard judgment is incorrect.
                console.log(str.replaceAll("dog", "monkey"))
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 3,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 5,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            const a = String.prototype.replaceAll
              ? /* OK */ str.replaceAll("dog", "monkey")
              : /* NG */ str.replaceAll("dog", "monkey");
            const b = typeof String.prototype.replaceAll === 'undefined'
              ? /* NG */ str.replaceAll("dog", "monkey")
              : /* OK */ str.replaceAll("dog", "monkey");`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 5,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 7,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str1 = "I think Ruth's dog is cuter than your dog!"
            const str2 = "I think Ruth's dog is cuter than your dog!"
            const a = str1.replaceAll
              ? /* OK */ str1.replaceAll("dog", "monkey")
              : /* NG */ str1.replaceAll("dog", "monkey");
            const b = str2.replaceAll /* NG: Because it is ineffective as a guard */
              ? /* NG */ str1.replaceAll("dog", "monkey")
              : /* NG */ str1.replaceAll("dog", "monkey");`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 6,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 7,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 8,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 9,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const a = {b:{c:"str"}};
            const x = (a?.b)?.c.replaceAll
              ? /* OK */ a.b.c.replaceAll("dog", "monkey")
              : /* NG */ a.b.c.replaceAll("dog", "monkey");
            const y = a.b.c.replaceAll
              ? /* OK */ (a?.b)?.c.replaceAll("dog", "monkey")
              : /* NG */ a.b.c.replaceAll("dog", "monkey");`,
            options: [{ aggressive: true, allowTestedProperty: true }],
            errors: [
                {
                    line: 5,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 8,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const a = {b:{c:"str"}};
            const x = a.b.c.replaceAll
              ? /* NG: Because it is different property */ a.b.x.replaceAll("dog", "monkey")
              : /* NG */ a.b.c.replaceAll("dog", "monkey");
            const y = a.b.c.replaceAll
              ? /* NG: Because it is different property */ a.x.c.replaceAll("dog", "monkey")
              : /* NG */ a.b.c.replaceAll("dog", "monkey");`,
            options: [{ aggressive: true, allowTestedProperty: true }],
            errors: [
                {
                    line: 3,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 4,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 5,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 6,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 7,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 8,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            function foo() {
                if (!String.prototype.replaceAll) {
                    // NG: Should use polyfills
                    return str.replaceAll("dog", "monkey")
                }
                return str.replaceAll("dog", "monkey")
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 6,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            function foo() {
                if (!String.prototype.replaceAll) {
                    // NG: Should use polyfills
                    if (x) {
                        return str.replaceAll("dog", "monkey")
                    } else return null;
                }
                return str.replaceAll("dog", "monkey")
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 7,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "I think Ruth's dog is cuter than your dog!"
            function foo() {
                if (!String.prototype.replaceAll) {
                    // NG: Should use polyfills
                    if (x) {
                        return str.replaceAll("dog", "monkey")
                    }
                }
                // NG: Because it's outside the scope of the guard
                return str.replaceAll("dog", "monkey")
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 4,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 7,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
                },
                {
                    line: 11,
                    message:
                        "ES2021 'String.prototype.replaceAll' method is forbidden.",
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
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "replaceAll('a')" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.replaceAll('a')" },
        { filename, code: "let foo = {}; foo.replaceAll('a')" },
        {
            filename,
            code: "replaceAll('a')",
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
            code: "'foo'.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = String(); foo.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.replaceAll('a') }",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.replaceAll('a') }",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
