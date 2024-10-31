"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-dynamic-import-options.js")

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-dynamic-import-options.")
    return
}

new RuleTester({
    languageOptions: { sourceType: "module" },
}).run("no-dynamic-import-options", rule, {
    valid: ["import(source)"],
    invalid: [
        {
            code: "const module = await import(source, options)",
            errors: ["ES2025 the second parameter to 'import()' is forbidden."],
        },
    ],
})
