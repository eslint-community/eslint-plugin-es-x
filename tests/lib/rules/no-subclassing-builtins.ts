/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-subclassing-builtins.js")

new RuleTester().run("no-subclassing-builtins", rule, {
    valid: [
        "class MyObject extends Object {}",
        "let Array = 0; class MyArray extends Array {}",
        "class Array {}",
        "Array",
    ],
    invalid: [
        {
            code: "class MyArray extends Array {}",
            errors: ["ES2015 subclassing of 'Array' is forbidden."],
        },
        {
            code: "class MyBoolean extends Boolean {}",
            errors: ["ES2015 subclassing of 'Boolean' is forbidden."],
        },
        {
            code: "class MyError extends Error {}",
            errors: ["ES2015 subclassing of 'Error' is forbidden."],
        },
        {
            code: "class MyRegExp extends RegExp {}",
            errors: ["ES2015 subclassing of 'RegExp' is forbidden."],
        },
        {
            code: "class MyFunction extends Function {}",
            errors: ["ES2015 subclassing of 'Function' is forbidden."],
        },
        {
            code: "class MyMap extends Map {}",
            errors: ["ES2015 subclassing of 'Map' is forbidden."],
        },
        {
            code: "class MyNumber extends Number {}",
            errors: ["ES2015 subclassing of 'Number' is forbidden."],
        },
        {
            code: "class MyPromise extends Promise {}",
            errors: ["ES2015 subclassing of 'Promise' is forbidden."],
        },
        {
            code: "class MySet extends Set {}",
            errors: ["ES2015 subclassing of 'Set' is forbidden."],
        },
        {
            code: "class MyString extends String {}",
            errors: ["ES2015 subclassing of 'String' is forbidden."],
        },
    ],
})
