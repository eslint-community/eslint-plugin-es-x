/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-import-meta.ts"

new RuleTester({
    languageOptions: { sourceType: "module" },
}).run("no-import-meta", rule, {
    valid: ["import * as Foo from 'foo'", "import('foo')"],
    invalid: [
        {
            code: "import.meta",
            errors: ["ES2020 'import.meta' meta property is forbidden."],
        },
    ],
})
