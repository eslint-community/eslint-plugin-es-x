/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-unicode-property-escapes-2019.js")

if (!RuleTester.isSupported(2019)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-regexp-unicode-property-escapes-2019.")
    return
}

new RuleTester().run("no-regexp-unicode-property-escapes-2019", rule, {
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
    ],
    invalid: [
        {
            code: String.raw`/\p{Extended_Pictographic}/u`,
            errors: ["ES2019 '\\p{Extended_Pictographic}' is forbidden."],
        },
        {
            code: String.raw`/\\\p{Extended_Pictographic}/u`,
            errors: ["ES2019 '\\p{Extended_Pictographic}' is forbidden."],
        },
        {
            code: String.raw`new RegExp('\\p{Extended_Pictographic}', 'u')`,
            errors: ["ES2019 '\\p{Extended_Pictographic}' is forbidden."],
        },
        {
            code: String.raw`new RegExp('\\\\\\p{Extended_Pictographic}', 'u')`,
            errors: ["ES2019 '\\p{Extended_Pictographic}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Dogr}/u`,
            errors: ["ES2019 '\\p{Script=Dogr}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Dogra}/u`,
            errors: ["ES2019 '\\p{Script=Dogra}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Gong}/u`,
            errors: ["ES2019 '\\p{Script=Gong}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Gunjala_Gondi}/u`,
            errors: ["ES2019 '\\p{Script=Gunjala_Gondi}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Hanifi_Rohingya}/u`,
            errors: ["ES2019 '\\p{Script=Hanifi_Rohingya}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Maka}/u`,
            errors: ["ES2019 '\\p{Script=Maka}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Makasar}/u`,
            errors: ["ES2019 '\\p{Script=Makasar}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Medefaidrin}/u`,
            errors: ["ES2019 '\\p{Script=Medefaidrin}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Medf}/u`,
            errors: ["ES2019 '\\p{Script=Medf}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Old_Sogdian}/u`,
            errors: ["ES2019 '\\p{Script=Old_Sogdian}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Rohg}/u`,
            errors: ["ES2019 '\\p{Script=Rohg}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Sogd}/u`,
            errors: ["ES2019 '\\p{Script=Sogd}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Sogdian}/u`,
            errors: ["ES2019 '\\p{Script=Sogdian}' is forbidden."],
        },
        {
            code: String.raw`/\p{Script=Sogo}/u`,
            errors: ["ES2019 '\\p{Script=Sogo}' is forbidden."],
        },
    ],
})
