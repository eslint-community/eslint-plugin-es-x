import assert from "node:assert"
import plugin from "../../../../lib/index.ts"
import type { Linter } from "eslint"

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe("flat config aliases", () => {
    for (const [name, flat] of Object.entries(plugin.configs).filter((entry) =>
        entry[0].startsWith("flat/"),
    )) {
        const configName = name.replace(/^flat\//u, "")

        describe(`${name} and ${configName}`, () => {
            it("should expose flat config rules for both config names", () => {
                const config = plugin.configs[
                    configName as keyof typeof plugin.configs
                ] as Linter.Config

                assert.deepStrictEqual(
                    config.rules,
                    (flat as Linter.Config).rules,
                )
            })

            it("should not expose eslintrc-only config fields", () => {
                const config = plugin.configs[
                    configName as keyof typeof plugin.configs
                ] as Linter.Config

                assert.strictEqual("extends" in config, false)
                assert.deepStrictEqual(Object.keys(config.plugins ?? {}), [
                    "es-x",
                ])
            })
        })
    }
})
