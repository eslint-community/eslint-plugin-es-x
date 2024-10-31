"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-toarray.js")
const ruleId = "no-iterator-prototype-toarray"

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log(`Skip the tests of ${ruleId}.`)
    return
}

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "toArray()",
        "foo.unknown(0)",
        "foo.toArray()",
        {
            code: "toArray()",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toArray()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        `
        function * foo(){};
        function bar() {
            if (baz) return foo();
            else return "s"
        };
        bar().toArray();
        `,
        `
        function * foo(){};
        function bar() {
            switch (baz) {
                case 1: return foo();
                default: return "s"
            }
        };
        bar().toArray();
        `,
        `
        function * foo(){};
        function bar() {
            try {
                return foo();
            } catch (e) {
                return Iterator.from(x)
            } finally {
                return "s"
            }
        };
        bar().toArray();
    `,
    ],
    invalid: [
        {
            code: "foo.toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toArray()",
            options: [{ aggressive: true }],
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "foo().toArray(); function * foo() {  }",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo).toArray();",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo).drop(3).toArray();",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: "function * foo(){}; function bar() { return foo() }; bar().toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                if (baz) return foo();
                else return Iterator.from(x)
              };
              bar().toArray();
            `,
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                while(true) return foo();
              };
              bar().toArray();
            `,
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                switch (baz) {
                    case 1: return foo();
                    default: return Iterator.from(x)
                }
              };
              bar().toArray();
            `,
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                try {
                  return foo();
                } catch (e) {
                  return Iterator.from(x)
                } finally {
                  return Iterator.from(y)
                }
              };
              bar().toArray();
            `,
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              const bar = () => foo();
              bar().toArray();
            `,
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require("@typescript-eslint/parser")
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
        { filename, code: "toArray()" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.toArray()" },
        {
            filename,
            code: "let foo = {}; foo.toArray()",
        },
        {
            filename,
            code: "toArray()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.unknown(0)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "let foo = [][Symbol.iterator]; foo().toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: Iterator<any>) { a.toArray() }",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function * foo(){}; foo().toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
