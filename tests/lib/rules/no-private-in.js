/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-private-in.js")

if (!RuleTester.isSupported(2022)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-private-in.")
    return
}

new RuleTester().run("no-private-in", rule, {
    valid: [
        "class A { f(obj) { return '#x' in obj } }",
        "class A { f(obj) { return x in obj } }",
        "class A { #x; f(obj) { return foo in obj.#x } }",
    ],
    invalid: [
        {
            code: "class A { #x; f(obj) { return #x in obj } }",
            errors: ["ES2022 private in (`#x in obj`) is forbidden."],
        },
        {
            code: "class A { #x; f(obj) { return #x in obj.foo } }",
            errors: ["ES2022 private in (`#x in object`) is forbidden."],
        },
        {
            code: "class A { #x; f(obj) { return #x in obj.#x } }",
            errors: ["ES2022 private in (`#x in object`) is forbidden."],
        },
    ],
})
