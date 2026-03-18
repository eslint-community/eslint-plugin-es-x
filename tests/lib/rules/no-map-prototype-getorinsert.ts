import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-map-prototype-getorinsert"
const ruleId = "no-map-prototype-getorinsert"

const method = "getOrInsert"

new RuleTester().run(ruleId, rule, {
    valid: [
        `${method}(key, value)`,
        `foo.${method}(key, value)`,
        "foo.set(key, value)",
        {
            code: `${method}(key, value)`,
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.set(key, value)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: `${method}(key, value)`,
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: `foo.${method}(key, value)`,
            errors: [`ES2026 'Map.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: `foo.${method}(key, value)`,
            options: [{ aggressive: true }],
            errors: [`ES2026 'Map.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: false } },
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
import * as parser from "@typescript-eslint/parser"
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({
    languageOptions: {
        parser,
        parserOptions: {
            tsconfigRootDir,
            project,
            disallowAutomaticSingleRunInference: true,
        },
    },
}).run(`${ruleId} TS Full Types`, rule, {
    valid: [
        { filename, code: `${method}(key, value)` },
        { filename, code: "foo.set(key, value)" },
        {
            filename,
            code: `foo.${method}(key, value)`,
        },
        {
            filename,
            code: `let foo = {}; foo.${method}(key, value)`,
        },
        {
            filename,
            code: `${method}(key, value)`,
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.set(key, value)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: `let foo = new Map(); foo.${method}(key, value)`,
            errors: [`ES2026 'Map.prototype.${method}' method is forbidden.`],
        },
        {
            filename,
            code: `function f<T extends Map<string, number>>(a: T) { a.${method}(key, value) }`,
            errors: [`ES2026 'Map.prototype.${method}' method is forbidden.`],
        },
        {
            filename,
            code: `foo.${method}(key, value)`,
            errors: [`ES2026 'Map.prototype.${method}' method is forbidden.`],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
