/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-for-of-loops.js")

new RuleTester().run("no-for-of-loops", rule, {
    valid: [
        "for(;;);",
        "for(a in b);",
        "for(var a in b);",
        "for(let a in b);",
        "for(const a in b);",
    ],
    invalid: [
        {
            code: "for(a of b);",
            errors: ["ES2015 'for-of' statements are forbidden."],
        },
        {
            code: "for(var a of b);",
            errors: ["ES2015 'for-of' statements are forbidden."],
        },
        {
            code: "for(let a of b);",
            errors: ["ES2015 'for-of' statements are forbidden."],
        },
        {
            code: "for(const a of b);",
            errors: ["ES2015 'for-of' statements are forbidden."],
        },
        {
            code: "async function f() { for await (const a of b); }",
            errors: ["ES2015 'for-of' statements are forbidden."],
        },
    ],
})
