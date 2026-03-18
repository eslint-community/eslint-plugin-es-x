/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-optional-catch-binding"

new RuleTester().run("no-optional-catch-binding", rule, {
    valid: ["try {} catch (err) {}"],
    invalid: [
        {
            code: "try {} catch {}",
            errors: ["ES2019 optional 'catch' binding is forbidden."],
        },
    ],
})
