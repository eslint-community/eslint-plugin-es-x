/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-finalization-registry.js")

new RuleTester({ globals: { FinalizationRegistry: false } }).run(
    "no-finalization-registry",
    rule,
    {
        valid: ["WeakMap"],
        invalid: [
            {
                code: "FinalizationRegistry",
                errors: ["ES2021 'FinalizationRegistry' class is forbidden."],
            },
        ],
    }
)
