"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-import-attributes.js")

new RuleTester({
    languageOptions: { sourceType: "module" },
}).run("no-import-attributes", rule, {
    valid: [
        "import foo from 'foo'",
        "export {foo} from 'foo'",
        "export * from 'foo'",
        "import('foo')",
        "import('foo', unknown)",
    ],
    invalid: [
        {
            code: "import foo from 'foo' with { type: 'json' }",
            errors: ["ES2025 Import Attributes are forbidden."],
        },
        {
            code: "export {foo} from 'foo' with { type: 'json' }",
            errors: ["ES2025 Import Attributes are forbidden."],
        },
        {
            code: "export * from 'foo' with { type: 'json' }",
            errors: ["ES2025 Import Attributes are forbidden."],
        },
        {
            code: "import('foo', { with: { type: 'json'} })",
            errors: ["ES2025 Import Attributes are forbidden."],
        },
        {
            code: "import('foo', { with: unknown })",
            errors: ["ES2025 Import Attributes are forbidden."],
        },
    ],
})
