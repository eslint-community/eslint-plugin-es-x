import * as espree from "espree"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-shadow-catch-param"

new RuleTester({
    languageOptions: { parser: espree },
}).run("no-shadow-catch-param", rule, {
    valid: [
        "var e; try {} catch (e) {  }",
        "try {} catch (e) {}",
        "try {} catch (e) { var a }",
        "try {} catch (e) { console.log(e) }",
        "try {} catch (e) { function foo() {var e} }",
        {
            code: "var e; try {} catch (e) {  }",
            languageOptions: { sourceType: "module" },
        },
        {
            code: "var e; try {} catch (e) {  }",
            languageOptions: { sourceType: "script" },
        },
        "try {} catch {}",
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
