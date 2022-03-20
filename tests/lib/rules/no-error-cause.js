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

new RuleTester({
    parserOptions: { sourceType: "module" },
}).run("no-error-cause", rule, {
    valid: [
        'new Error("message")',
        'new Error("message", notObjectExpression)',
        'new Error("message", { notCause: foo })',
        'class MyError extends Error { constructor() { super("message") } }',
        'class MyError extends Error { constructor() { super("message", notObjectExpression) } }',
        'class MyError extends Error { constructor() { super("message", { notCause: foo }) } }',
        'new AggregateError("message")',
        'new AggregateError("message", notObjectExpression)',
        'new AggregateError("message", { notCause: foo })',
        'class MyError extends AggregateError { constructor() { super("message") } }',
        'class MyError extends AggregateError { constructor() { super("message", notObjectExpression) } }',
        'class MyError extends AggregateError { constructor() { super("message", { notCause: foo }) } }',
    ],
    invalid: [
        {
            code: 'new Error("message", { cause: foo });',
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: 'new Error("message", { ["cause"]: foo });',
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: 'const MyError = Error; new MyError("message", { ["cause"]: foo });',
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: 'class MyError extends Error { constructor() { super("message", { cause: foo }); } }',
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: 'new AggregateError("message", { cause: foo });',
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: 'new AggregateError("message", { ["cause"]: foo });',
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: 'const MyError = AggregateError; new MyError("message", { ["cause"]: foo });',
            errors: ["ES2022 Error Cause is forbidden."],
        },
        {
            code: 'class MyError extends AggregateError { constructor() { super("message", { cause: foo }); } }',
            errors: ["ES2022 Error Cause is forbidden."],
        },
    ],
})
