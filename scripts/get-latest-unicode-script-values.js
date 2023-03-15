"use strict"

const {
    getLatestUnicodePropertyValues,
} = require("./get-latest-unicode-property-values")

module.exports = { getLatestUnicodeScriptValues }

async function* getLatestUnicodeScriptValues() {
    for await (const value of getLatestUnicodePropertyValues()) {
        if (value.propertyAlias !== "sc") {
            continue
        }

        yield* value.aliases
    }
}
