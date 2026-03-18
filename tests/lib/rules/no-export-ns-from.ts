/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-export-ns-from.js")

new RuleTester({
    languageOptions: { sourceType: "module" },
}).run("no-export-ns-from", rule, {
    valid: [
        'export * from "mod"',
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
            code: 'export * as ns from "mod"',
            errors: ["ES2020 'export * as ns' are forbidden."],
        },
    ],
})
