/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-template-literals.js")

new RuleTester().run("no-template-literals", rule, {
    valid: [
        "'foo'",
        '"bar"',
        `
const a1 = "foo"
const a2 = "foo"+bar+"baz"
    `,
    ],
    invalid: [
        {
            code: "`foo`",
            output: `"foo"`,
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            code: "tag`foo`",
            output: null,
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "`foo${a}bar${b}baz`",
            output: `"foo"+a+"bar"+b+"baz"`,
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            code: `
const a1 = \`foo\`
const a2 = \`foo\${bar}baz\`
const a3 = tag\`foo\`
            `,
            output: `
const a1 = "foo"
const a2 = "foo"+bar+"baz"
const a3 = tag\`foo\`
            `,
            errors: [
                "ES2015 template literals are forbidden.",
                "ES2015 template literals are forbidden.",
                "ES2015 template literals are forbidden.",
            ],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "`${a}${b}`",
            output: `""+a+b`,
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            code: "``",
            output: `""`,
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: '`${""}`',
            output: `""`,
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "`${''}`",
            output: `''`,
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            code: "`\n\t '\"\\`\\$\\${`",
            output: `"\\n\\t '\\"\`$\${"`,
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "`${'abc'}`",
            output: `'abc'`,
            errors: ["ES2015 template literals are forbidden."],
        },
    ],
})
