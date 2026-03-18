import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-json-parse-reviver-context-parameter"

new RuleTester().run("no-json-parse-reviver-context-parameter", rule, {
    valid: [
        'JSON.parse("{}")',
        'JSON.parse("{}", (key, value) => value)',
        'JSON.parse("{}", function(key, value) { return value; })',
        'let JSON = 0; JSON.parse("{}", (key, value, context) => value)',
    ],
    invalid: [
        {
            code: 'JSON.parse("{}", (key, value, context) => { return value; })',
            errors: [
                {
                    message:
                        "Unexpected context parameter in JSON.parse reviver function.",
                    line: 1,
                    column: 31,
                },
            ],
        },
        {
            code: 'JSON.parse("{}", function(key, value, context) { return value; })',
            errors: [
                {
                    message:
                        "Unexpected context parameter in JSON.parse reviver function.",
                    line: 1,
                    column: 39,
                },
            ],
        },
    ],
})
