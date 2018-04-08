/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-arrow-functions.js")

new RuleTester().run("no-arrow-functions", rule, {
    valid: ["function f() {}", "const f = function() {}"],
    invalid: [
        {
            code: "() => 1",
            output: "function(){return  1}",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: "() => {}",
            output: "function() {}",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: "() => this.data",
            output: "function(){return  this.data}.bind(this)",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: "a => a",
            output: "function(a){return  a}",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: "(a,  b) => a - b",
            output: "function(a,  b){return  a - b}",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code:
                "var fnRestParams = (param1, param2, ...rest) => { statements }",
            output:
                "var fnRestParams = function(param1, param2, ...rest) { statements }",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code:
                "var fnDefParams = (param1 = defaultValue1, param2, paramN = defaultValueN) => { statements }",
            output:
                "var fnDefParams = function(param1 = defaultValue1, param2, paramN = defaultValueN) { statements }",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code:
                "var fnDestructuring = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;",
            output:
                "var fnDestructuring = function([a, b] = [1, 2], {x: c} = {x: a + b}){return  a + b + c};",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: "let square = n => ({ square: n * n });",
            output: "let square = function(n){return  ({ square: n * n })};",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: `
var comment1 = a => /*comment*/ a;
var comment2 = a => /*
comment
*/ a;
var comment3 = a => // comment
a;
            `,
            output: `
var comment1 = function(a){return  /*comment*/ a};
var comment2 = function(a){return  /*
comment
*/ a};
var comment3 = function(a){return  // comment
a};
            `,
            errors: [
                "ES2015 arrow function expressions are forbidden.",
                "ES2015 arrow function expressions are forbidden.",
                "ES2015 arrow function expressions are forbidden.",
            ],
        },
        {
            code: `
var fnHasThis1 = () => {
    proc();
    return function() {}.bind(this);
}
var fnHasThis2 = () => {
    proc();
    this.proc()
}
            `,
            output: `
var fnHasThis1 = function() {
    proc();
    return function() {}.bind(this);
}.bind(this)
var fnHasThis2 = function() {
    proc();
    this.proc()
}.bind(this)
            `,
            errors: [
                "ES2015 arrow function expressions are forbidden.",
                "ES2015 arrow function expressions are forbidden.",
            ],
        },
        {
            code: `
class SubClass extends SuperClass {

    methodSub() {
        const f = () => {
            return super.methodSuper()
        }
        return f
    }
}
            `,
            output: null,
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: `
const f = () => {
    return function () {
        return this
    }
}
            `,
            output: `
const f = function() {
    return function () {
        return this
    }
}
            `,
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: `
const f = () => {
    return () => {
        return this
    }
}
            `,
            output: `
const f = function() {
    return () => {
        return this
    }
}.bind(this)
            `,
            errors: [
                "ES2015 arrow function expressions are forbidden.",
                "ES2015 arrow function expressions are forbidden.",
            ],
        },
    ],
})
