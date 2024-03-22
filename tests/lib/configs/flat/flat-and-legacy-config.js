"use strict"

const assert = require("assert")
const plugin = require("../../../..")

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe("flat config and legacy config", () => {
    for (const name of Object.keys(plugin.configs).filter((n) =>
        n.startsWith("flat/"),
    )) {
        describe(`flat/${name} and plugin:es-x/${name}`, () => {
            it("The `rules` config must match between flat config and legacy config", () => {
                const flat = plugin.configs[name]
                const legacy = plugin.configs[name.replace(/^flat\//u, "")]

                assert.deepStrictEqual(flat.rules, resolveRules(legacy))
            })
        })
    }

    function resolveRules(config) {
        const rules = {}
        if (config.extends) {
            for (const c of config.extends.map((id) => require(id))) {
                Object.assign(rules, resolveRules(c))
            }
        }
        return Object.assign(rules, config.rules || {})
    }
})
