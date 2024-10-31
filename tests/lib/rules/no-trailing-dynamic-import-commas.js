"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-trailing-dynamic-import-commas.js")

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-trailing-dynamic-import-commas.")
    return
}

new RuleTester({
    languageOptions: { sourceType: "module" },
}).run("no-trailing-dynamic-import-commas", rule, {
    valid: ["import(source)", "import(source, options)"],
    invalid: [
        {
            code: "import(source,)",
            output: "import(source)",
            errors: ["ES2025 trailing commas in 'import()' are forbidden."],
        },
        {
            code: "import(source, options,)",
            output: "import(source, options)",
            errors: ["ES2025 trailing commas in 'import()' are forbidden."],
        },
    ],
})
