/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { RuleTester } from "eslint"
import * as globals from "globals"

RuleTester.setDefaultConfig({
    languageOptions: {
        ecmaVersion: 2026,
        sourceType: "script",
        globals: {
            AsyncDisposableStack: "readonly",
            DisposableStack: "readonly",
            SuppressedError: "readonly",
            Temporal: "readonly",
            ...globals.builtin,
        },
    },
})

export default RuleTester
