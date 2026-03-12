"use strict"

module.exports = { fetchLines }

async function* fetchLines(url: string) {
    const response = await fetch(url)
    yield* (await response.text()).split("\n")
}
