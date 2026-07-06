import { fetchLines } from "./fetch-lines.ts"
const DB_URL =
    "https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt"
const logger = console

interface UnicodePropertyValue {
    propertyAlias: string
    aliases: string[]
    canonical: string
}

let cache: Promise<UnicodePropertyValue[]> | undefined = undefined

export async function* getLatestUnicodePropertyValues() {
    cache ??= Array.fromAsync(fetchLatestUnicodePropertyValues())
    yield* await cache
}

async function* fetchLatestUnicodePropertyValues() {
    logger.log("Fetching data... (%s)", DB_URL)

    for await (const line of fetchLines(DB_URL)) {
        if (!line || line.startsWith("#")) {
            continue
        }
        const [propertyAlias, alias, canonical, ...remaining] = line
            .split("#")[0] // strip comments
            .split(";") // split by semicolon
            .map((x) => x.trim()) // trim

        yield {
            propertyAlias,
            aliases: [canonical, alias, ...remaining],
            canonical,
        }
    }
}
