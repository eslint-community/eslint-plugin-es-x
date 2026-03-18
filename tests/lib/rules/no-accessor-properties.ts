/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-accessor-properties"

new RuleTester().run("no-accessor-properties", rule, {
    valid: [
        "({ get: function() {} })",
        "({ set: function() {} })",
        "({ get() {} })",
        "({ set(value) {} })",
    ],
    invalid: [
        {
            code: "({ get a() {} })",
            errors: ["ES5 accessor properties are forbidden."],
        },
        {
            code: "({ set a(value) {} })",
            errors: ["ES5 accessor properties are forbidden."],
        },
        {
            code: "class A { get a() {} }",
            errors: ["ES5 accessor properties are forbidden."],
        },
        {
            code: "class A { set a(value) {} }",
            errors: ["ES5 accessor properties are forbidden."],
        },
    ],
})
