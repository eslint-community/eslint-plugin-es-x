import path from "node:path"
import assert from "node:assert"
import eslintModule from "eslint"
import pluginESx from "../../../../lib/index"

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const dirname = path.dirname(new URL(import.meta.url).pathname)
const TEST_CWD = path.resolve(
    path.join(dirname, "../../fixtures/integrations/eslint-plugin"),
)

describe("ESM flat config", () => {
    const allConfigs: eslintModule.Linter.Config[] = []
    for (const [name, config] of Object.entries(pluginESx.configs).filter(
        (entry): entry is [string, eslintModule.Linter.Config] =>
            entry[0].startsWith("flat/"),
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

async function lint(configs: eslintModule.Linter.Config[]) {
    const ESLint = (await (eslintModule.loadESLint as any)({
        useFlatConfig: true,
    })) as typeof eslintModule.ESLint
    const eslint = new ESLint({
        cwd: TEST_CWD,
        overrideConfigFile: true,
        overrideConfig: configs,
    })
    const results = await eslint.lintText(String.raw`var a = 42;`, {
        filePath: "test.js",
    })
    return results[0]
}
