"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-arraybuffer-prototype-transfer.js")

new RuleTester().run("no-arraybuffer-prototype-transfer", rule, {
    valid: [
        "transfer()",
        "transferToFixedLength()",
        "detached",
        "foo.resize()",
        "foo.transfer()",
        "foo.transferToFixedLength()",
        "foo.detached",
        { code: "transfer()", settings: { "es-x": { aggressive: true } } },
        {
            code: "transferToFixedLength()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "detached",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.resize()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.transfer()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.transferToFixedLength()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.detached",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.transfer()",
            errors: [
                "ES2024 'ArrayBuffer.prototype.transfer' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.transferToFixedLength()",
            errors: [
                "ES2024 'ArrayBuffer.prototype.transferToFixedLength' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.detached",
            errors: [
                "ES2024 'ArrayBuffer.prototype.detached' property is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "const foo = new ArrayBuffer(8); foo.transfer()",
            errors: [
                "ES2024 'ArrayBuffer.prototype.transfer' method is forbidden.",
            ],
        },
        {
            code: "const foo = new ArrayBuffer(8); foo.transferToFixedLength()",
            errors: [
                "ES2024 'ArrayBuffer.prototype.transferToFixedLength' method is forbidden.",
            ],
        },
        {
            code: "const foo = new ArrayBuffer(8); foo.detached",
            errors: [
                "ES2024 'ArrayBuffer.prototype.detached' property is forbidden.",
            ],
        },
        {
            code: `
            const arrayBuffer = new ArrayBuffer(8);
            // Transfer to take ownership, which implementations can choose to
            // implement as a zero-copy move.
            const owned = arrayBuffer.transfer();
        
            // arrayBuffer is detached after this point.
            assert(arrayBuffer.detached);
            `,
            errors: [
                "ES2024 'ArrayBuffer.prototype.transfer' method is forbidden.",
                "ES2024 'ArrayBuffer.prototype.detached' property is forbidden.",
            ],
        },
    ],
})
