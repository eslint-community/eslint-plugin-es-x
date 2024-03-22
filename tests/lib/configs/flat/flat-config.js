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
    const allConfigs = []
    for (const [name, config] of Object.entries(plugin.configs).filter(([n]) =>
        n.startsWith("flat/"),
    )) {
        describe(`flat/${name}`, () => {
            it("should lint without errors", () =>
                lint([config]).then((result) => {
                    assert.deepStrictEqual(result.messages, [])
                }))
        })
        allConfigs.push(config)
    }
    describe("all flat configs", () => {
        it("should lint without errors", () =>
            lint(allConfigs).then((result) => {
                assert.deepStrictEqual(result.messages, [])
            }))
    })
})

async function lint(configs) {
    const ESLint = await eslintModule.loadESLint({ useFlatConfig: true })
    const eslint = new ESLint({
        cwd: TEST_CWD,
        overrideConfigFile: true,
        overrideConfig: configs,
    })
    return eslint
        .lintText(String.raw`var a = 42;`, { filePath: "test.js" })
        .then((results) => results[0])
}
