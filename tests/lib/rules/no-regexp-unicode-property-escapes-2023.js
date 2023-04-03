/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-unicode-property-escapes-2023.js")

if (!RuleTester.isSupported(2023)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-regexp-unicode-property-escapes-2023.")
    return
}

new RuleTester().run("no-regexp-unicode-property-escapes-2023", rule, {
    valid: [
        String.raw`/\p{Letter}/u`,
        String.raw`/\P{Letter}/u`,
        String.raw`/\p{Script=Hiragana}/u`,
        String.raw`/\P{Script=Hiragana}/u`,
        String.raw`/\p{Extended_Pictographic}/`,
        String.raw`/\P{Extended_Pictographic}/`,
        String.raw`/\p{Script=Dogr}/`,
        String.raw`/\P{Script=Dogr}/`,
        String.raw`new RegExp('\\p{Extended_Pictographic}')`,
        String.raw`new RegExp('\\\\p{Extended_Pictographic}', 'u')`,
        String.raw`/\p{Extended_Pictographic}/u`,
        String.raw`/\p{Script=Dogr}/u`,
        String.raw`/\p{Script=Elym}/u`,
        String.raw`/\p{EBase}/u`,
        String.raw`/\p{Script=Chorasmian}/u`,
        String.raw`/\p{Script=Cpmn}/u`,
    ],
    invalid: [
        {
            code: String.raw`/\p{Script=Kawi}/u`,
            errors: ["ES2023 '\\p{Script=Kawi}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Nag_Mundari}/u`,
            errors: ["ES2023 '\\p{Script=Nag_Mundari}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Nagm}/u`,
            errors: ["ES2023 '\\p{Script=Nagm}' is forbidden."],
        },
    ],
})
