import path from "path"
import assert from "assert"
import eslintModule from "eslint"
import pluginESx from "../../../../lib/index.js"

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

if (eslintModule.loadESLint) {
    const dirname = path.dirname(new URL(import.meta.url).pathname)
    const TEST_CWD = path.normalize(
        path.join(dirname, "../../fixtures/integrations/eslint-plugin"),
    )

    describe("ESM flat config", () => {
        const allConfigs = []
        for (const [name, config] of Object.entries(pluginESx.configs).filter(
            ([n]) => n.startsWith("flat/"),
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
}
