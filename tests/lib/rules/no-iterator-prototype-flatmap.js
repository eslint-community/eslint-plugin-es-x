"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-flatmap.js")
const ruleId = "no-iterator-prototype-flatmap"

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log(`Skip the tests of ${ruleId}.`)
    return
}

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "flatMap(n => [n, -n])",
        "foo.unknown(0)",
        "foo.flatMap(n => [n, -n])",
        {
            code: "flatMap(n => [n, -n])",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.flatMap(n => [n, -n])",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        `
        function * foo(){};
        function bar() {
            if (baz) return foo();
            else return "s"
        };
        bar().flatMap(n => [n, -n]);
        `,
        `
        function * foo(){};
        function bar() {
            switch (baz) {
                case 1: return foo();
                default: return "s"
            }
        };
        bar().flatMap(n => [n, -n]);
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
        bar().flatMap(n => [n, -n]);
    `,
    ],
    invalid: [
        {
            code: "foo.flatMap(n => [n, -n])",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.flatMap(n => [n, -n])",
            options: [{ aggressive: true }],
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "foo().flatMap(n => [n, -n]); function * foo() {  }",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo).flatMap(n => [n, -n]);",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo).drop(3).flatMap(n => [n, -n]);",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            code: "function * foo(){}; function bar() { return foo() }; bar().flatMap(n => [n, -n])",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                if (baz) return foo();
                else return Iterator.from(x)
              };
              bar().flatMap(n => [n, -n]);
            `,
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                while(true) return foo();
              };
              bar().flatMap(n => [n, -n]);
            `,
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
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
              bar().flatMap(n => [n, -n]);
            `,
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
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
              bar().flatMap(n => [n, -n]);
            `,
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              const bar = () => foo();
              bar().flatMap(n => [n, -n]);
            `,
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
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
        { filename, code: "flatMap(n => [n, -n])" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.flatMap(n => [n, -n])" },
        {
            filename,
            code: "let foo = {}; foo.flatMap(n => [n, -n])",
        },
        {
            filename,
            code: "flatMap(n => [n, -n])",
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
            code: "let foo = [][Symbol.iterator]; foo().flatMap(n => [n, -n])",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: Iterator<any>) { a.flatMap(n => [n, -n]) }",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function * foo(){}; foo().flatMap(n => [n, -n])",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.flatMap(n => [n, -n])",
            errors: [
                "ES2025 'Iterator.prototype.flatMap' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
