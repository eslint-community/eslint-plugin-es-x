"use strict"

module.exports = { fetchLines }

async function* fetchLines(url) {
    const response = await fetch(url)
    yield* (await response.text()).split("\n")
}
