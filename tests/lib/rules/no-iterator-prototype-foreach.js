"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-foreach.js")
const ruleId = "no-iterator-prototype-foreach"

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log(`Skip the tests of ${ruleId}.`)
    return
}

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "forEach(n => {/* ... */})",
        "foo.unknown(0)",
        "foo.forEach(n => {/* ... */})",
        {
            code: "forEach(n => {/* ... */})",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.forEach(n => {/* ... */})",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        `
        function * foo(){};
        function bar() {
            if (baz) return foo();
            else return "s"
        };
        bar().forEach(n => {/* ... */});
        `,
        `
        function * foo(){};
        function bar() {
            switch (baz) {
                case 1: return foo();
                default: return "s"
            }
        };
        bar().forEach(n => {/* ... */});
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
        bar().forEach(n => {/* ... */});
    `,
    ],
    invalid: [
        {
            code: "foo.forEach(n => {/* ... */})",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.forEach(n => {/* ... */})",
            options: [{ aggressive: true }],
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "foo().forEach(n => {/* ... */}); function * foo() {  }",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo).forEach(n => {/* ... */});",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo).drop(3).forEach(n => {/* ... */});",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            code: "function * foo(){}; function bar() { return foo() }; bar().forEach(n => {/* ... */})",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                if (baz) return foo();
                else return Iterator.from(x)
              };
              bar().forEach(n => {/* ... */});
            `,
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                while(true) return foo();
              };
              bar().forEach(n => {/* ... */});
            `,
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
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
              bar().forEach(n => {/* ... */});
            `,
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
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
              bar().forEach(n => {/* ... */});
            `,
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            code: `
              function * foo(){};
              const bar = () => foo();
              bar().forEach(n => {/* ... */});
            `,
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
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
        { filename, code: "forEach(n => {/* ... */})" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.forEach(n => {/* ... */})" },
        {
            filename,
            code: "let foo = {}; foo.forEach(n => {/* ... */})",
        },
        {
            filename,
            code: "forEach(n => {/* ... */})",
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
            code: "let foo = [][Symbol.iterator]; foo().forEach(n => {/* ... */})",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: Iterator<any>) { a.forEach(n => {/* ... */}) }",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function * foo(){}; foo().forEach(n => {/* ... */})",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.forEach(n => {/* ... */})",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
