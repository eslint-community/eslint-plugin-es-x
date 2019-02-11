/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-modules.js")

new RuleTester({
    parserOptions: { sourceType: "module" },
}).run("no-modules", rule, {
    valid: ["module.exports = {}", "require('x')"],
    invalid: [
        {
            code: "import x from 'x'",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "import * as x from 'x'",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "import x, {y, z} from 'x'",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "export {x} from 'x'",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "const x = 0; export {x}",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "export const a = 0",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "export function f() {}",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "export class A {}",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "export default 0",
            errors: ["ES2015 modules are forbidden."],
        },
        {
            code: "export default function() {}",
            errors: ["ES2015 modules are forbidden."],
        },
    ],
})
