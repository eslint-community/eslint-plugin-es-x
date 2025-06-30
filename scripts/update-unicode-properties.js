"use strict"

const fs = require("fs")
const path = require("path")
const { JSDOM } = require("jsdom")
const { ESLint } = require("eslint")
const {
    getLatestUnicodeGeneralCategoryValues,
} = require("./get-latest-unicode-general-category-values")
const {
    getLatestUnicodeScriptValues,
} = require("./get-latest-unicode-script-values")

const DATA_SOURCES = [
    {
        url: "https://262.ecma-international.org/9.0/",
        version: 2018,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
    {
        url: "https://262.ecma-international.org/10.0/",
        version: 2019,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
    {
        url: "https://262.ecma-international.org/11.0/",
        version: 2020,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
    {
        url: "https://262.ecma-international.org/12.0/",
        version: 2021,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
    {
        url: "https://tc39.es/ecma262/2022/multipage/text-processing.html",
        version: 2022,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
    {
        url: "https://tc39.es/ecma262/2023/multipage/text-processing.html",
        version: 2023,
        binProperties: "#table-binary-unicode-properties",
        gcValues: getLatestUnicodeGeneralCategoryValues,
        scValues: getLatestUnicodeScriptValues,
    },
    {
        url: "https://tc39.es/ecma262/2024/multipage/text-processing.html",
        version: 2024,
        binProperties: "#table-binary-unicode-properties",
        gcValues: getLatestUnicodeGeneralCategoryValues,
        scValues: getLatestUnicodeScriptValues,
    },
    {
        url: "https://tc39.es/ecma262/2025/multipage/text-processing.html",
        version: 2025,
        binProperties: "#table-binary-unicode-properties",
        gcValues: getLatestUnicodeGeneralCategoryValues,
        scValues: getLatestUnicodeScriptValues,
    },
    {
        url: "https://tc39.es/ecma262/multipage/text-processing.html",
        version: 2026,
        binProperties: "#table-binary-unicode-properties",
        gcValues: getLatestUnicodeGeneralCategoryValues,
        scValues: getLatestUnicodeScriptValues,
    },
]
const FILE_PATH = path.resolve(__dirname, "../lib/util/unicode-properties.js")
const logger = console

// Main
;(async () => {
    const data = Object.create(null)
    const existing = {
        binProperties: new Set(),
        gcValues: new Set(),
        scValues: new Set(),
    }

    for (const {
        binProperties,
        gcValues,
        scValues,
        url,
        version,
    } of DATA_SOURCES) {
        logger.log("---- ECMAScript %d ----", version)
        const datum = {
            binProperties: [],
            gcValues: [],
            scValues: [],
        }
        data[version] = datum

        let window = null
        do {
            try {
                logger.log("Fetching data from %o", url)
                ;({ window } = await JSDOM.fromURL(url))
            } catch (error) {
                if (!error || error.message !== "Error: socket hang up") {
                    throw error
                }
                logger.log(error.message, "then retry.")
                await new Promise((resolve) => setTimeout(resolve, 2000))
            }
        } while (window == null)

        logger.log("Parsing tables")
        datum.binProperties = await collectValues(
            window,
            binProperties,
            existing.binProperties,
        )
        datum.gcValues = await collectValues(
            window,
            gcValues,
            existing.gcValues,
        )
        datum.scValues = await collectValues(
            window,
            scValues,
            existing.scValues,
        )

        logger.log("Done")
    }

    logger.log("Generating code...")
    let code = `/* This file was generated with ECMAScript specifications. */
"use strict"
${makeClassDeclarationCode(Object.keys(data))}
const gcNameSet = new Set(["General_Category", "gc"])
const scNameSet = new Set(["Script", "Script_Extensions", "sc", "scx"])
const gcValueSets = new DataSet(${Object.values(data)
        .map((d) => makeDataCode(d.gcValues))
        .join(",")})
const scValueSets = new DataSet(${Object.values(data)
        .map((d) => makeDataCode(d.scValues))
        .join(",")})
const binPropertySets = new DataSet(${Object.values(data)
        .map((d) => makeDataCode(d.binProperties))
        .join(",")})
module.exports = {gcNameSet, scNameSet, gcValueSets, scValueSets, binPropertySets}
`

    logger.log("Formatting code...")

    const result = await new ESLint({ fix: true }).lintText(code, {
        filePath: FILE_PATH,
    })
    code = result[0].output || code

    logger.log("Writing '%s'...", FILE_PATH)
    await save(code)

    logger.log("Completed!")
})().catch((error) => {
    logger.error(error.stack)
    process.exitCode = 1
})

async function collectValues(window, idSelectorOrProvider, existingSet) {
    const getValues =
        typeof idSelectorOrProvider === "function"
            ? idSelectorOrProvider
            : function* () {
                  const selector = `${idSelectorOrProvider} td:nth-child(1) code`
                  const nodes = window.document.querySelectorAll(selector)
                  if (nodes.length === 0) {
                      throw new Error(`No nodes found for selector ${selector}`)
                  }
                  logger.log(
                      "%o nodes of %o were found.",
                      nodes.length,
                      selector,
                  )
                  for (const node of Array.from(nodes)) {
                      yield node.textContent ?? ""
                  }
              }

    const missing = new Set(existingSet)
    const values = new Set()
    let allCount = 0

    for await (const value of getValues()) {
        allCount++
        missing.delete(value)
        if (existingSet.has(value)) {
            continue
        }
        existingSet.add(value)
        values.add(value)
    }

    if (missing.size > 0) {
        throw new Error(`Missing values: ${Array.from(missing).join(", ")}`)
    }

    logger.log(
        "%o adopted and %o ignored as duplication.",
        values.size,
        allCount - values.size,
    )

    return [...values].sort(undefined)
}

function makeClassDeclarationCode(versions) {
    const parameters = versions.map((v) => `raw${v}`).join(", ")
    const init = versions.map((v) => `this._raw${v} = raw${v}`).join("\n")
    const getters = versions
        .map(
            (v) =>
                `get es${v}() { return this._set${v} || (this._set${v} = new Set(this._raw${v}.split(" "))) }`,
        )
        .join("\n")

    return `
        class DataSet {
            constructor(${parameters}) {
                ${init}
            }
            ${getters}
        }
    `
}

function makeDataCode(values) {
    return `"${values
        .map((value) => JSON.stringify(value).slice(1, -1))
        .join(" ")}"`
}

function save(content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(FILE_PATH, content, (error) =>
            error ? reject(error) : resolve(),
        )
    })
}
