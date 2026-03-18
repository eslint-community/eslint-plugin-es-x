import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-weakref-prototype-properties"
import { weakRefPrototypeProperties } from "../../../lib/util/well-known-properties"
const ruleId = "no-nonstandard-weakref-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...weakRefPrototypeProperties].map((p) => `new WeakRef().${p}`),
        { code: "new WeakRef().unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "new WeakRef().unknown()",
            errors: [
                "Non-standard 'WeakRef.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new WeakRef().foo",
            errors: [
                "Non-standard 'WeakRef.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new WeakRef().bar",
            errors: [
                "Non-standard 'WeakRef.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new WeakRef()[0]",
            errors: [
                "Non-standard 'WeakRef.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new WeakRef()['0']",
            errors: [
                "Non-standard 'WeakRef.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new WeakRef()['01']",
            errors: [
                "Non-standard 'WeakRef.prototype.01' property is forbidden.",
            ],
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
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "foo" },
        { filename, code: "foo.toString" },
        { filename, code: "foo.foo" },
        { filename, code: "let foo = {}; foo.foo" },
        ...[...weakRefPrototypeProperties].map((p) => ({
            filename,
            code: `new WeakRef().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new WeakRef().foo",
            errors: [
                "Non-standard 'WeakRef.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakRef().bar",
            errors: [
                "Non-standard 'WeakRef.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakRef()[0]",
            errors: [
                "Non-standard 'WeakRef.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakRef()['0']",
            errors: [
                "Non-standard 'WeakRef.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakRef()['01']",
            errors: [
                "Non-standard 'WeakRef.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new WeakRef(); foo.foo",
            errors: [
                "Non-standard 'WeakRef.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends WeakRef<any>>(a: T) { a.baz }",
            errors: [
                "Non-standard 'WeakRef.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
