"use strict"

const path = require("path")
const assert = require("assert")
const eslintModule = require("eslint")
const plugin = require("../../../..")

if (!eslintModule.loadESLint) {
    return
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const TEST_CWD = path.join(
    __dirname,
    "../../fixtures/integrations/eslint-plugin",
)

describe("flat config", () => {
    for (const [name, config] of Object.entries(plugin.configs).filter(([n]) =>
        n.startsWith("flat/"),
    )) {
        describe(`flat/${name}`, () => {
            it("should lint without errors", () =>
                lint(config).then((result) => {
                    assert.strictEqual(result.messages.length, 0)
                }))
        })
    }
})

async function lint(config) {
    const ESLint = await eslintModule.loadESLint({ useFlatConfig: true })
    const eslint = new ESLint({
        cwd: TEST_CWD,
        overrideConfigFile: true,
        overrideConfig: [config],
    })
    return eslint
        .lintText(String.raw`var a = 42;`, { filePath: "test.js" })
        .then((results) => results[0])
}
