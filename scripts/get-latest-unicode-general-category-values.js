"use strict"

const { fetchLines } = require("./fetch-lines")

const DB_URL =
    "https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt"
const logger = console

module.exports = { getLatestUnicodeGeneralCategoryValues }

async function* getLatestUnicodeGeneralCategoryValues() {
    logger.log("Fetching data... (%s)", DB_URL)
    for await (const line of fetchLines(DB_URL)) {
        if (!line || line.startsWith("#")) {
            continue
        }
        const [propertyAlias, alias, canonical, ...remaining] = line
            .split("#")[0] // strip comments
            .split(";") // split by semicolon
            .map((x) => x.trim()) // trim
        if (propertyAlias !== "gc") {
            continue
        }

        yield alias
        yield canonical
        yield* remaining
    }
}
