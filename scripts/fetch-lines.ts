"use strict"

export { fetchLines }

async function* fetchLines(url: string) {
    const response = await fetch(url)
    yield* (await response.text()).split("\n")
}
