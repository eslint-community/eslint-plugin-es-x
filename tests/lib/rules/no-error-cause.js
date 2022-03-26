/**
 * @author Sosuke Suzuki <https://github.com/sosukesuzuki>
 * See LICENSE file in root directory for full license.
 */

"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-error-cause.js")

if (!RuleTester.isSupported(2022)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-error-cause.")
    return
}

const errorConstructorNames = [
    "Error",
    "AggregateError",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
]

const valid = errorConstructorNames
    .map((errorConstructorName) => [
        `new ${errorConstructorName}("message")`,
        `new ${errorConstructorName}("message", notObjectExpression)`,
        `new ${errorConstructorName}("message", { notCause: foo })`,
        `class MyError extends ${errorConstructorName} { constructor() { super("message") } }`,
        `class MyError extends ${errorConstructorName} { constructor() { super("message", notObjectExpression) } }`,
        `class MyError extends ${errorConstructorName} { constructor() { super("message", { notCause: foo }) } }`,
    ])
    // alternative of `Array.prototype.flat`
    .reduce((acc, val) => acc.concat(val), [])

const invalid = errorConstructorNames
    .map((errorConstructorName) => [
        {
            code: `new ${errorConstructorName}("message", { cause: foo });`,
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: `new ${errorConstructorName}("message", { ["cause"]: foo });`,
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: `const MyError = ${errorConstructorName}; new MyError("message", { ["cause"]: foo });`,
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: `class MyError extends ${errorConstructorName} { constructor() { super("message", { cause: foo }); } }`,
            errors: ["ES2022 Error Cause is forbidden."],
        },
    ])
    // alternative of `Array.prototype.flat`
    .reduce((acc, val) => acc.concat(val), [])

new RuleTester({
    parserOptions: { sourceType: "module" },
}).run("no-error-cause", rule, { valid, invalid })
