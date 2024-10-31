"use strict"

const RuleTester = require("../../../tester")
const { deepStrictEqual } = require("assert")
const {
    buildExpressionTypeProvider,
} = require("../../../../lib/util/define-prototype-method-handler/object-type-checker")
const { getLinter } = require("eslint-compat-utils/linter")
const Linter = getLinter()

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

if (!RuleTester.isSupported(2022)) {
    //eslint-disable-next-line no-console
    console.log(
        "Skip the tests of define-prototype-method-handler/object-type-checker.",
    )
    return
}

describe("define-prototype-method-handler/object-type-checker", () => {
    describe("buildExpressionTypeProvider", () => {
        for (const { code, result, only } of [
            {
                code: "target('foo');",
                result: ["String"],
            },
            {
                code: "target(42);",
                result: ["Number"],
            },
            {
                code: "target(true);",
                result: ["Boolean"],
            },
            {
                code: "target(/foo/);",
                result: ["RegExp"],
            },
            {
                code: "target(null);",
                result: ["null"],
            },
            {
                code: "target(42n);",
                result: ["BigInt"],
            },
            {
                code: "target([]);",
                result: ["Array"],
            },
            {
                code: "target({});",
                result: ["Object"],
            },
            {
                code: "target(function(){});",
                result: ["Function"],
            },
            {
                code: "target(()=>{});",
                result: ["Function"],
            },
            {
                code: "target(a);",
                result: [null],
            },
            {
                code: "target(NaN);",
                result: ["Number"],
            },
            {
                code: "target(Infinity);",
                result: ["Number"],
            },
            {
                code: "target(undefined);",
                result: ["undefined"],
            },
            {
                code: `
                const a = 'i'
                target(a);`,
                result: ["String"],
            },
            {
                code: `
                function f(){}
                target(f);`,
                result: ["Function"],
            },
            {
                code: `
                const a = b
                target(a);`,
                result: [null],
            },
            {
                code: `
                const a = a
                target(a);`,
                result: [null],
            },
            {
                code: `
                var a = 'foo'
                var a = 42
                target(a);`,
                result: [null],
            },
            {
                code: `
                var a = 'foo'
                a = 42
                var b = 'bar'
                target(a, b);`,
                result: [null, "String"],
            },
            {
                code: "target(`foo`);",
                result: ["String"],
            },
            {
                // eslint-disable-next-line no-template-curly-in-string
                code: "target(`foo${a}`);",
                result: ["String"],
            },
            {
                code: `
                const a = 'i'
                target('foo' + 'bar');
                target(a + 'foo');
                target('foo' + a + 'bar');
            `,
                result: ["String", "String", "String"],
            },
            {
                code: `
                const a = 'i'
                target(b + 'bar');
                target('foo' + a + b);
                `,
                result: ["String", "String"],
            },
            {
                code: `
                const a = 42
                target(
                    a + 'bar',
                    foo + 'bar',
                    'bar' + foo,
                    42 + a,
                    {} + 42,
                    42 + null,
                    42 + {},
                    42n + foo,
                    42 + foo,
                );
                `,
                result: [
                    "String",
                    "String",
                    "String",
                    "Number",
                    "Number",
                    "Number",
                    "String",
                    "BigInt",
                    null,
                ],
            },
            {
                code: `
                let b = 42
                target(
                    b += 'bar',
                );
                `,
                result: ["String"],
            },
            {
                code: `
                let b = 42
                target(
                    b = 'bar',
                );
                `,
                result: ["String"],
            },
            ...[
                "==",
                "!=",
                "===",
                "!==",
                "<",
                "<=",
                ">",
                ">=",
                "in",
                "instanceof",
            ].map((op) => ({
                code: `
                target(
                    foo ${op} bar,
                );
                `,
                result: ["Boolean"],
            })),
            ...["-", "*", "/", "%", "^", "**", "&", "|"].map((op) => ({
                code: `
                target(
                    foo ${op} bar,
                    42 ${op} bar,
                    foo ${op} 42,
                    42n ${op} bar,
                    foo ${op} 42n,
                );
                `,
                result: [null, "Number", "Number", "BigInt", "BigInt"],
            })),
            ...["-", "*", "/", "%", "^", "**", "&", "|"].map((op) => ({
                code: `
                target(
                    foo ${op}= bar,
                    foo ${op}= 42,
                    foo ${op}= 42n,
                );
                `,
                result: [null, "Number", "BigInt"],
            })),
            ...["&&", "||", "??"].map((op) => ({
                code: `
                    const a = 1
                    const b = 1
                    const c = 1n
                    const d = 1n
                    target(
                        a ${op} b,
                        c ${op} d,
                        foo ${op} bar,
                        42 ${op} bar,
                        foo ${op} 42,
                        42n ${op} bar,
                        foo ${op} 42n,
                    );
                    `,
                result: ["Number", "BigInt", null, null, null, null, null],
            })),
            ...["&&", "||", "??"].map((op) => ({
                code: `
                const a = 1
                const b = 1
                const c = 1n
                const d = 1n
                target(
                    a ${op}= b,
                    c ${op}= d,
                    foo ${op}= bar,
                    foo ${op}= 42,
                    foo ${op}= 42n,
                );
                `,
                result: ["Number", "BigInt", null, null, null],
            })),
            ...["<<", ">>", ">>>"].map((op) => ({
                code: `
                target(
                    foo ${op} bar,
                );
                `,
                result: ["Number"],
            })),
            ...["<<", ">>", ">>>"].map((op) => ({
                code: `
                target(
                    foo ${op}= bar,
                );
                `,
                result: ["Number"],
            })),
            {
                code: `
                target(
                    !foo,
                    delete foo.bar
                );
                `,
                result: ["Boolean", "Boolean"],
            },
            {
                code: `
                target(
                    +bar,
                );
                `,
                result: ["Number"],
            },
            ...["-", "~"].map((op) => ({
                code: `
                target(
                    ${op}foo,
                    ${op}42,
                    ${op}42n,
                );
                `,
                result: [null, "Number", "BigInt"],
            })),
            {
                code: `
                target(
                    typeof bar,
                    void bar,
                );
                `,
                result: ["String", "undefined"],
            },
            {
                code: `
                target(
                    (foo,'bar'),
                );
                `,
                result: ["String"],
            },
            {
                code: `
                target(
                    class Foo {},
                );
                `,
                result: ["Function"],
            },
            ...[
                "String",
                "Number",
                "BigInt",
                "Boolean",
                "Symbol",
                "Object",
                "Array",
                "Function",
                "RegExp",
                "Date",
            ].map((t) => ({
                code: `
                target(
                    ${t}(),
                    ${t}\`\`,
                );
                `,
                result: [t, t],
            })),
            ...[
                "String",
                "Number",
                "BigInt",
                "Boolean",
                "Symbol",
                "Object",
                "Array",
                "Function",
                "RegExp",
                "Date",
                "Promise",
                "Intl.Collator",
                "Intl.DateTimeFormat",
                "Intl.ListFormat",
                "Intl.NumberFormat",
                "Intl.PluralRules",
                "Intl.RelativeTimeFormat",
                "Intl.Segmenter",
                "Int8Array",
                "Uint8Array",
                "Uint8ClampedArray",
                "Int16Array",
                "Uint16Array",
                "Int32Array",
                "Uint32Array",
                "Float32Array",
                "Float64Array",
                "BigInt64Array",
                "BigUint64Array",
            ].map((t) => ({
                code: `
                target(
                    new ${t}(),
                );
                `,
                result: [t],
            })),
            {
                code: `
                target(
                    a ? 'a' : 'b',
                    a ? 'a' : 42,
                );
                `,
                result: ["String", null],
            },
            {
                code: `
                target(
                    a++,
                    --a,
                );
                `,
                result: ["Number", "Number"],
            },
            {
                code: `
                target("".length);
                `,
                result: ["Number"],
            },
            {
                code: `
                target(
                    String.fromCharCode(42),
                    String.fromCodePoint(42),
                    String.raw\`\`,
                );
                `,
                result: ["String", "String", "String"],
            },
            {
                code: `
                const { promise, resolve, reject } = Promise.withResolvers()
                target(promise, resolve, reject);
                `,
                result: ["Promise", "Function", "Function"],
            },
        ]) {
            ;(only ? it.only : it)(code, () => {
                deepStrictEqual(
                    getResultOfBuildExpressionTypeProvider(code),
                    result,
                )
            })
        }
    })
})

function getResultOfBuildExpressionTypeProvider(code) {
    const linter = new Linter()

    const result = []
    const linterResult = linter.verify(code, {
        plugins: {
            test: {
                rules: {
                    "test-rule": {
                        create(context) {
                            const getType = buildExpressionTypeProvider(context)
                            return {
                                "CallExpression[callee.name = target]"(node) {
                                    result.push(...node.arguments.map(getType))
                                },
                            }
                        },
                    },
                },
            },
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
        },
        rules: { "test/test-rule": "warn" },
    })
    deepStrictEqual(linterResult, [])
    return result
}
