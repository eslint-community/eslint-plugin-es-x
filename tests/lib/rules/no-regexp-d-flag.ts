/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-regexp-d-flag"

new RuleTester().run("no-regexp-d-flag", rule, {
    valid: [
        "/foo/gimuys",
        "a\n/b/d",
        "new RegExp('foo', 'gimuys')",
        "new RegExp('foo')",
        "new RegExp('foo', flags)",
        "const flags = 'gimuys'; new RegExp('foo', flags)",
    ],
    invalid: [
        {
            code: "/foo/d",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
        {
            code: "/foo/gimsuyd",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'd')",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'gimsuyd')",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
        {
            code: "const flags = 'd'; new RegExp('foo', flags)",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
    ],
})
