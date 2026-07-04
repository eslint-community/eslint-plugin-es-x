import assert from "node:assert"
import plugin from "../../../../lib/index"
import type { Linter } from "eslint"

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe("flat config and legacy config", () => {
    for (const [name, flat] of Object.entries(plugin.configs).filter((entry) =>
        entry[0].startsWith("flat/"),
    )) {
        describe(`flat/${name} and plugin:es-x/${name}`, () => {
            it("The `rules` config must match between flat config and legacy config", () => {
                const legacy = plugin.configs[
                    name.replace(/^flat\//u, "") as keyof typeof plugin.configs
                ] as Linter.LegacyConfig

                assert.deepStrictEqual(
                    (flat as Linter.Config).rules,
                    resolveRules(legacy),
                )
            })
        })
    }

    function resolveRules(config: Linter.LegacyConfig) {
        let rules = {}
        if (config.extends) {
            const extendsArray = Array.isArray(config.extends)
                ? config.extends
                : [config.extends]
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            for (const c of extendsArray.map((id) => require(id))) {
                rules = { ...rules, ...resolveRules(c) }
            }
        }
        return { ...rules, ...config.rules }
    }
})
