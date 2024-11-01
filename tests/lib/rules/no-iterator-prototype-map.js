"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-map.js")
const ruleId = "no-iterator-prototype-map"

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log(`Skip the tests of ${ruleId}.`)
    return
}

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "map(n => n % 2)",
        "foo.unknown(0)",
        "foo.map(n => n % 2)",
        {
            code: "map(n => n % 2)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.map(n => n % 2)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        `
        function * foo(){};
        function bar() {
            if (baz) return foo();
            else return "s"
        };
        bar().map(n => n % 2);
        `,
        `
        function * foo(){};
        function bar() {
            switch (baz) {
                case 1: return foo();
                default: return "s"
            }
        };
        bar().map(n => n % 2);
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
        bar().map(n => n % 2);
    `,
    ],
    invalid: [
        {
            code: "foo.map(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.map(n => n % 2)",
            options: [{ aggressive: true }],
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "foo().map(n => n % 2); function * foo() {  }",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            code: "Iterator.from(foo).map(n => n % 2);",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            code: "Iterator.from(foo).drop(3).map(n => n % 2);",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            code: "function * foo(){}; function bar() { return foo() }; bar().map(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                if (baz) return foo();
                else return Iterator.from(x)
              };
              bar().map(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                while(true) return foo();
              };
              bar().map(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
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
              bar().map(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
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
              bar().map(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              const bar = () => foo();
              bar().map(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
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
        { filename, code: "map(n => n % 2)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.map(n => n % 2)" },
        {
            filename,
            code: "let foo = {}; foo.map(n => n % 2)",
        },
        {
            filename,
            code: "map(n => n % 2)",
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
            code: "let foo = [][Symbol.iterator]; foo().map(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            filename,
            code: "function f(a: Iterator<any>) { a.map(n => n % 2) }",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            filename,
            code: "function * foo(){}; foo().map(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
        },
        {
            filename,
            code: "foo.map(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.map' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
