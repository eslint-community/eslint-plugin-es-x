/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-destructuring.js")

new RuleTester().run("no-destructuring", rule, {
    valid: ["({})", "({a: 1})", "[]", "[1]", "var a = {a}"],
    invalid: [
        {
            code: "var [a, {b: []}, [c], [d] = ary1, ...e] = ary2",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "let [a, {b: []}, [c], [d] = ary1, ...e] = ary2",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "const [a, {b: []}, [c], [d] = ary1, ...e] = ary2",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "([a, {b: []}, [c], [d] = ary1, ...e] = ary2)",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "for ([a, {b: []}, [c], [d] = ary1, ...e] in ary2);",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "for ([a, {b: []}, [c], [d] = ary1, ...e] of ary2);",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "function f([a, {b: []}, [c], [d] = ary1, ...e]) {}",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "function f([a, {b: []}, [c], [d] = ary1, ...e] = ary2) {}",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "function f(...[a, {b: []}, [c], [d] = ary1, ...e]) {}",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "var { a: {b}, c: [d, {e}, ...f], ...g} = obj",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "let { a: {b}, c: [d, {e}, ...f], ...g} = obj",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "const { a: {b}, c: [d, {e}, ...f], ...g} = obj",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "({ a: {b}, c: [d, {e}, ...f], ...g} = obj)",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "for ({ a: {b}, c: [d, {e}, ...f], ...g} in obj);",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "for ({ a: {b}, c: [d, {e}, ...f], ...g} of obj);",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "function f({ a: {b}, c: [d, {e}, ...f], ...g}) {}",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "function f({ a: {b}, c: [d, {e}, ...f], ...g} = obj) {}",
            errors: ["ES2015 destructuring is forbidden."],
        },
        {
            code: "function f(...{ a: {b}, c: [d, {e}, ...f], ...g}) {}",
            errors: ["ES2015 destructuring is forbidden."],
        },
    ],
})
