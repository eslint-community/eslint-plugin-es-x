"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-json-modules.js")

new RuleTester({
    languageOptions: { sourceType: "module" },
}).run("no-json-modules", rule, {
    valid: [
        "import foo from 'foo'",
        "export {foo} from 'foo'",
        "export * from 'foo'",
        "import foo from 'foo' with { type: 'unknown' }",
        "export {foo} from 'foo' with { type: 'unknown' }",
        "export * from 'foo' with { type: 'unknown' }",
        "import('foo')",
        "import('foo', unknown)",
        "import('foo', { with: unknown })",
        "import('foo', { with: { type: 'unknown' } })",
    ],
    invalid: [
        {
            code: "import foo from 'foo' with { type: 'json' }",
            errors: ["ES2025 JSON Modules are forbidden."],
        },
        {
            code: "export {foo} from 'foo' with { type: 'json' }",
            errors: ["ES2025 JSON Modules are forbidden."],
        },
        {
            code: "export * from 'foo' with { type: 'json' }",
            errors: ["ES2025 JSON Modules are forbidden."],
        },
        {
            code: "import('foo', { with: { type: 'json'} })",
            errors: ["ES2025 JSON Modules are forbidden."],
        },
        {
            code: `
                const options = { with: { type: 'json' } }
                import('foo', options)
            `,
            errors: ["ES2025 JSON Modules are forbidden."],
        },
        {
            code: `
                const attributes = { type: 'json' }
                import('foo', { with: attributes })
            `,
            errors: ["ES2025 JSON Modules are forbidden."],
        },
        {
            code: `
                const typeJson = 'json'
                import('foo', { with: { type: typeJson } })
            `,
            errors: ["ES2025 JSON Modules are forbidden."],
        },
    ],
})
