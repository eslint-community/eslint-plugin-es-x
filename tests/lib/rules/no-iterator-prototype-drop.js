"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-drop.js")
const ruleId = "no-iterator-prototype-drop"

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log(`Skip the tests of ${ruleId}.`)
    return
}

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "drop(3)",
        "foo.unknown(0)",
        "foo.drop(3)",
        {
            code: "drop(3)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.drop(3)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        `
        function * foo(){};
        function bar() {
            if (baz) return foo();
            else return "s"
        };
        bar().drop(3);
        `,
        `
        function * foo(){};
        function bar() {
            switch (baz) {
                case 1: return foo();
                default: return "s"
            }
        };
        bar().drop(3);
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
        bar().drop(3);
    `,
    ],
    invalid: [
        {
            code: "foo.drop(3)",
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.drop(3)",
            options: [{ aggressive: true }],
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "foo().drop(3); function * foo() {  }",
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
        {
            code: "Iterator.from(foo).drop(3);",
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
        {
            code: "Iterator.from(foo).drop(3).drop(3);",
            errors: [
                "ES2025 'Iterator.prototype.drop' method is forbidden.",
                "ES2025 'Iterator.prototype.drop' method is forbidden.",
            ],
        },
        {
            code: "function * foo(){}; function bar() { return foo() }; bar().drop(3)",
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                if (baz) return foo();
                else return Iterator.from(x)
              };
              bar().drop(3);
            `,
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              function bar() {
                while(true) return foo();
              };
              bar().drop(3);
            `,
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
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
              bar().drop(3);
            `,
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
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
              bar().drop(3);
            `,
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
        {
            code: `
              function * foo(){};
              const bar = () => foo();
              bar().drop(3);
            `,
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
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
        { filename, code: "drop(3)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.drop(3)" },
        {
            filename,
            code: "let foo = {}; foo.drop(3)",
        },
        {
            filename,
            code: "drop(3)",
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
            code: "let foo = [][Symbol.iterator]; foo().drop(3)",
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
        {
            filename,
            code: "function f(a: Iterator<any>) { a.drop(3) }",
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
        {
            filename,
            code: "function * foo(){}; foo().drop(3)",
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
        {
            filename,
            code: "foo.drop(3)",
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: '"s".matchAll(/a/g).drop(1)',
            errors: ["ES2025 'Iterator.prototype.drop' method is forbidden."],
        },
    ],
})
