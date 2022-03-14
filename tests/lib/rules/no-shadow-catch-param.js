"use strict"

const semver = require("semver")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-shadow-catch-param.js")

if (semver.lt(RuleTester.eslintVersion, "5.0.0")) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-shadow-catch-param.")
    return
}

new RuleTester({
    parser: require.resolve("espree"),
}).run("no-shadow-catch-param", rule, {
    valid: [
        "var e; try {} catch (e) {  }",
        "try {} catch (e) {}",
        "try {} catch (e) { var a }",
        "try {} catch (e) { console.log(e) }",
        "try {} catch (e) { function foo() {var e} }",
        {
            code: "var e; try {} catch (e) {  }",
            parserOptions: { sourceType: "module" },
        },
        {
            code: "var e; try {} catch (e) {  }",
            parserOptions: { sourceType: "script" },
        },
        ...(RuleTester.isSupported(2019) ? ["try {} catch {}"] : []),
    ],
    invalid: [
        {
            code: "try {} catch (e) { var e }",
            errors: ["Shadowing of catch parameter 'e'."],
        },
        {
            code: "try {} catch (err) { var err; var err; }",
            errors: [
                "Shadowing of catch parameter 'err'.",
                "Shadowing of catch parameter 'err'.",
            ],
        },
        {
            code: "try {} catch (e) { if (foo) {var e} }",
            errors: ["Shadowing of catch parameter 'e'."],
        },
    ],
})
