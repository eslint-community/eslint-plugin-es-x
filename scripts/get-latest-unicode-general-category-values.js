"use strict"

const {
    getLatestUnicodePropertyValues,
} = require("./get-latest-unicode-property-values")

module.exports = { getLatestUnicodeGeneralCategoryValues }

async function* getLatestUnicodeGeneralCategoryValues() {
    for await (const value of getLatestUnicodePropertyValues()) {
        if (value.propertyAlias !== "gc") {
            continue
        }

        yield* value.aliases
    }
}
