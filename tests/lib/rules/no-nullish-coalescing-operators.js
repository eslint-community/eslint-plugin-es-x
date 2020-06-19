/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nullish-coalescing-operators.js")

if (!RuleTester.isSupported(2020)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-nullish-coalescing-operators.")
    return
}

new RuleTester().run("no-nullish-coalescing-operators", rule, {
    valid: ["a ? b : c", "a && b", "a || b"],
    invalid: [
        {
            code: "a??b",
            errors: [
                {
                    message:
                        "ES2020 nullish coalescing operators are forbidden.",
                    column: 2,
                    endColumn: 4,
                },
            ],
        },
        {
            code: ` /* ?? comment ?? */
            a /* ?? comment ?? */
            ?? /* ?? comment ?? */
            b /* ?? comment ?? */`,
            errors: [
                {
                    message:
                        "ES2020 nullish coalescing operators are forbidden.",
                    line: 3,
                    column: 13,
                    endLine: 3,
                    endColumn: 15,
                },
            ],
        },
        {
            code: "a ?? b ?? c",
            errors: [
                {
                    message:
                        "ES2020 nullish coalescing operators are forbidden.",
                    column: 3,
                    endColumn: 5,
                },
                {
                    message:
                        "ES2020 nullish coalescing operators are forbidden.",
                    column: 8,
                    endColumn: 10,
                },
            ],
        },
        {
            code: "(a ?? b) ?? c",
            errors: [
                {
                    message:
                        "ES2020 nullish coalescing operators are forbidden.",
                    column: 4,
                    endColumn: 6,
                },
                {
                    message:
                        "ES2020 nullish coalescing operators are forbidden.",
                    column: 10,
                    endColumn: 12,
                },
            ],
        },
    ],
})
