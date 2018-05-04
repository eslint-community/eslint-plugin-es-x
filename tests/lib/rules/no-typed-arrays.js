/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-typed-arrays.js")

new RuleTester().run("no-typed-arrays", rule, {
    valid: ["Array", "Set"],
    invalid: [
        {
            code: "Int8Array",
            errors: ["ES2015 'Int8Array' is forbidden."],
        },
        {
            code: "Uint8Array",
            errors: ["ES2015 'Uint8Array' is forbidden."],
        },
        {
            code: "Uint8ClampedArray",
            errors: ["ES2015 'Uint8ClampedArray' is forbidden."],
        },
        {
            code: "Int16Array",
            errors: ["ES2015 'Int16Array' is forbidden."],
        },
        {
            code: "Uint16Array",
            errors: ["ES2015 'Uint16Array' is forbidden."],
        },
        {
            code: "Int32Array",
            errors: ["ES2015 'Int32Array' is forbidden."],
        },
        {
            code: "Uint32Array",
            errors: ["ES2015 'Uint32Array' is forbidden."],
        },
        {
            code: "Float32Array",
            errors: ["ES2015 'Float32Array' is forbidden."],
        },
        {
            code: "Float64Array",
            errors: ["ES2015 'Float64Array' is forbidden."],
        },
        {
            code: "DataView",
            errors: ["ES2015 'DataView' is forbidden."],
        },
    ],
})
