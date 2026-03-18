import assert from "assert"
import plugin from "../../../../lib/index"
import type { Linter } from "eslint"

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe("flat config and legacy config", () => {
    for (const name of Object.keys(plugin.configs).filter((n) =>
        n.startsWith("flat/"),
    )) {
        describe(`flat/${name} and plugin:es-x/${name}`, () => {
            it("The `rules` config must match between flat config and legacy config", () => {
                const flat = plugin.configs[
                    name as keyof typeof plugin.configs
                ] as Linter.Config
                const legacy = plugin.configs[
                    name.replace(/^flat\//u, "") as keyof typeof plugin.configs
                ] as Linter.LegacyConfig

                assert.deepStrictEqual(flat.rules, resolveRules(legacy))
            })
        })
    }

    function resolveRules(config: Linter.LegacyConfig) {
        const rules = {}
        if (config.extends) {
            const extendsArray = Array.isArray(config.extends)
                ? config.extends
                : [config.extends]
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            for (const c of extendsArray.map((id) => require(id))) {
                Object.assign(rules, resolveRules(c))
            }
        }
        return Object.assign(rules, config.rules || {})
    }
})
