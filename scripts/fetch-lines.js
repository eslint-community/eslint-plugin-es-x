"use strict"

module.exports = { fetchLines }

async function* fetchLines(url) {
    const response = await fetch(url) // eslint-disable-line n/no-unsupported-features/node-builtins -- non-production code
    yield* (await response.text()).split("\n")
}
