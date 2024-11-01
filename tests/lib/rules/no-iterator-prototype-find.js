"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-find.js")
const ruleId = "no-iterator-prototype-find"

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log(`Skip the tests of ${ruleId}.`)
    return
}

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "find(n => n % 2)",
        "foo.unknown(0)",
        "foo.find(n => n % 2)",
        {
            code: "find(n => n % 2)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.find(n => n % 2)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        `
        function * foo(){};
        function bar() {
            if (baz) return foo();
            else return "s"
        };
        bar().find(n => n % 2);
        `,
        `
        function * foo(){};
        function bar() {
            switch (baz) {
                case 1: return foo();
                default: return "s"
            }
        };
        bar().find(n => n % 2);
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
        bar().find(n => n % 2);
    `,
    ],
    invalid: [
        {
            code: "foo.find(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.find(n => n % 2)",
            options: [{ aggressive: true }],
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "foo().find(n => n % 2); function * foo() {  }",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            code: "Iterator.from(foo).find(n => n % 2);",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            code: "Iterator.from(foo).drop(3).find(n => n % 2);",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            code: "function * foo(){}; function bar() { return foo() }; bar().find(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                if (baz) return foo();
                else return Iterator.from(x)
              };
              bar().find(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                while(true) return foo();
              };
              bar().find(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
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
              bar().find(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
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
              bar().find(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              const bar = () => foo();
              bar().find(n => n % 2);
            `,
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
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
        { filename, code: "find(n => n % 2)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.find(n => n % 2)" },
        {
            filename,
            code: "let foo = {}; foo.find(n => n % 2)",
        },
        {
            filename,
            code: "find(n => n % 2)",
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
            code: "let foo = [][Symbol.iterator]; foo().find(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "function f(a: Iterator<any>) { a.find(n => n % 2) }",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "function * foo(){}; foo().find(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "foo.find(n => n % 2)",
            errors: ["ES2025 'Iterator.prototype.find' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
