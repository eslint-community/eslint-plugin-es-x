/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-dynamic-import.js")

new RuleTester().run("no-dynamic-import", rule, {
    valid: [
        {
            code: "import a from 'a'",
            languageOptions: { sourceType: "module" },
        },
        "obj.\nimport(source)",
    ],
    invalid: [
        {
            code: "import(source)",
            errors: ["ES2020 'import()' syntax is forbidden."],
        },
    ],
})
