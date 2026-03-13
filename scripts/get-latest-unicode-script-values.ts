"use strict"

import { getLatestUnicodePropertyValues } from "./get-latest-unicode-property-values"

export { getLatestUnicodeScriptValues }

async function* getLatestUnicodeScriptValues() {
    for await (const value of getLatestUnicodePropertyValues()) {
        if (value.propertyAlias !== "sc") {
            continue
        }

        yield* value.aliases
    }
}
