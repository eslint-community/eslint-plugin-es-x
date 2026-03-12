"use strict"

import { getLatestUnicodePropertyValues } from "./get-latest-unicode-property-values"

export { getLatestUnicodeGeneralCategoryValues }

async function* getLatestUnicodeGeneralCategoryValues() {
    for await (const value of getLatestUnicodePropertyValues()) {
        if (value.propertyAlias !== "gc") {
            continue
        }

        yield* value.aliases
    }
}
