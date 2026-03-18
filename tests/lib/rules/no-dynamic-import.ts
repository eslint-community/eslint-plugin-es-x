/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-dynamic-import"

new RuleTester().run("no-dynamic-import", rule, {
    valid: [
        {
            code: "import a from 'a'",
            languageOptions: { sourceType: "module" },
        },
        "obj.\nimport(source)",
    ],
    invalid: [
        {
            code: "import(source)",
            errors: ["ES2020 'import()' syntax is forbidden."],
        },
    ],
})
