import * as path from "node:path"
import * as assert from "node:assert"
import * as plugin from "../../../lib/index"
import { ESLint } from "eslint"

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const TEST_CWD = path.join(__dirname, "../fixtures/integrations/eslint-plugin")

describe("define-regexp-handler", () => {
    it("should lint with errors", () =>
        lint(String.raw`
        /* eslint es-x/no-regexp-unicode-property-escapes: error, es-x/no-regexp-unicode-property-escapes-2019: error, */
        /\p{Extended_Pictographic}/u;
`).then((result) => {
            assert.strictEqual(result.messages.length, 2)
            assert.deepStrictEqual(
                result.messages.map((m) => m.ruleId),
                [
                    "es-x/no-regexp-unicode-property-escapes",
                    "es-x/no-regexp-unicode-property-escapes-2019",
                ],
            )
        }))
})

async function lint(text: string) {
    const eslint = new ESLint({
        cwd: TEST_CWD,
        overrideConfigFile: true,
        overrideConfig: {
            languageOptions: {
                ecmaVersion: 2019,
            },
            plugins: { "es-x": plugin },
        },
    })
    const results = await eslint.lintText(text, { filePath: "test.js" })
    return results[0]
}
