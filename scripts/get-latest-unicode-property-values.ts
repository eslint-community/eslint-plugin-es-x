"use strict"

import { fetchLines } from "./fetch-lines"
const DB_URL =
    "https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt"
const logger = console

let cache:
    | Array<{
          propertyAlias: string
          aliases: string[]
          canonical: string
      }>
    | undefined = undefined

export { getLatestUnicodePropertyValues }

async function* getLatestUnicodePropertyValues() {
    logger.log("Fetching data... (%s)", DB_URL)
    const iterable = cache
        ? cache
        : (async function* () {
              const newCache: Array<{
                  propertyAlias: string
                  aliases: string[]
                  canonical: string
              }> = []
              for await (const line of fetchLines(DB_URL)) {
                  if (!line || line.startsWith("#")) {
                      continue
                  }
                  const [propertyAlias, alias, canonical, ...remaining] = line
                      .split("#")[0] // strip comments
                      .split(";") // split by semicolon
                      .map((x) => x.trim()) // trim

                  const value = {
                      propertyAlias,
                      aliases: [canonical, alias, ...remaining],
                      canonical,
                  }
                  newCache.push(value)
                  yield value
              }
              cache = newCache
          })()
    for await (const value of iterable) {
        yield value
    }
}
