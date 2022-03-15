"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-legacy-object-prototype-accessor-methods.js")

new RuleTester().run("no-legacy-object-prototype-accessor-methods", rule, {
    valid: [
        "Object.defineProperty(foo, prop, descriptor)",
        "Object.getOwnPropertyDescriptor(foo, prop)",
        `
        const __defineGetter__ = ()=>42;
        __defineGetter__()
        `,
        `
        const __defineSetter__ = ()=>42;
        __defineSetter__()
        `,
        `
        const __lookupGetter__ = ()=>42;
        __lookupGetter__()
        `,
        `
        const __lookupSetter__ = ()=>42;
        __lookupSetter__()
        `,
        `
        {
            const __defineGetter__ = ()=>42;
            __defineGetter__()
        }
        `,
        `
        {
            var __defineGetter__ = ()=>42;
            __defineGetter__()
        }
        `,
        `
        const foo = {__defineGetter__:42};
        `,
    ],
    invalid: [
        {
            code: "foo.__defineGetter__(prop, func)",
            errors: ["LEGACY '__defineGetter__' method is forbidden."],
        },
        {
            code: "foo.__defineSetter__(prop, val, func)",
            errors: ["LEGACY '__defineSetter__' method is forbidden."],
        },
        {
            code: "foo.__lookupGetter__(prop)",
            errors: ["LEGACY '__lookupGetter__' method is forbidden."],
        },
        {
            code: "foo.__lookupSetter__(prop)",
            errors: ["LEGACY '__lookupSetter__' method is forbidden."],
        },
        {
            code: "__defineGetter__(prop, func)",
            errors: ["LEGACY '__defineGetter__' method is forbidden."],
        },
        {
            code: "__defineSetter__(prop, val, func)",
            errors: ["LEGACY '__defineSetter__' method is forbidden."],
        },
        {
            code: "__lookupGetter__(prop)",
            errors: ["LEGACY '__lookupGetter__' method is forbidden."],
        },
        {
            code: "__lookupSetter__(prop)",
            errors: ["LEGACY '__lookupSetter__' method is forbidden."],
        },
        {
            code: `
            __defineGetter__(prop, func)
            __defineSetter__(prop, val, func)
            __lookupGetter__(prop)
            __lookupSetter__(prop)`,
            globals: {
                __defineGetter__: false,
                __defineSetter__: false,
                __lookupGetter__: false,
                __lookupSetter__: false,
            },
            errors: [
                "LEGACY '__defineGetter__' method is forbidden.",
                "LEGACY '__defineSetter__' method is forbidden.",
                "LEGACY '__lookupGetter__' method is forbidden.",
                "LEGACY '__lookupSetter__' method is forbidden.",
            ],
        },
        {
            code: "__defineGetter__.call",
            errors: ["LEGACY '__defineGetter__' method is forbidden."],
        },
        {
            code: "const foo = {__defineGetter__}",
            errors: ["LEGACY '__defineGetter__' method is forbidden."],
        },
    ],
})
