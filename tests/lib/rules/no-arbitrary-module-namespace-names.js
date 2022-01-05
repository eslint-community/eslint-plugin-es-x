/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-arbitrary-module-namespace-names.js")

if (!RuleTester.isSupported(2022)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-arbitrary-module-namespace-names.")
    return
}

new RuleTester({
    parserOptions: { sourceType: "module" },
}).run("no-arbitrary-module-namespace-names", rule, {
    valid: [
        'export * from "mod"',
        'export * as ns from "mod"',
        "export default foo",
        'export {foo} from "mod"',
        'export {foo as bar} from "mod"',
        'import * as foo from "mod"',
        'import foo from "mod"',
        'import {foo} from "mod"',
        'import {foo as bar} from "mod"',
    ],
    invalid: [
        {
            code: 'export * as "ns" from "mod"',
            errors: ["ES2022 arbitrary module namespace names are forbidden."],
        },
        {
            code: 'export {foo as "bar"} from "mod"',
            errors: ["ES2022 arbitrary module namespace names are forbidden."],
        },
        {
            code: 'export {"foo" as "bar"} from "mod"',
            errors: [
                "ES2022 arbitrary module namespace names are forbidden.",
                "ES2022 arbitrary module namespace names are forbidden.",
            ],
        },
        {
            code: 'import {"foo" as bar} from "mod"',
            errors: ["ES2022 arbitrary module namespace names are forbidden."],
        },
    ],
})
