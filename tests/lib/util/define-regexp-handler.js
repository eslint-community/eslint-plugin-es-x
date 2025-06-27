"use strict"

const path = require("path")
const assert = require("assert")
const plugin = require("../../..")
const { ESLint } = require("eslint")

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

function lint(text) {
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
    return eslint
        .lintText(text, { filePath: "test.js" })
        .then((results) => results[0])
}
