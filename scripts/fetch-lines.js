"use strict"

module.exports = { fetchLines }

async function* fetchLines(url) {
    const response = await fetch(url)
    let buffer = ""
    const decoder = new TextDecoder()
    for await (const chunk of response.body) {
        const lines = (buffer + decoder.decode(chunk)).split("\n")
        if (lines.length === 1) {
            buffer = lines[0]
        } else {
            buffer = lines.pop()
            for (const line of lines) {
                yield line
            }
        }
    }
    yield buffer
}
