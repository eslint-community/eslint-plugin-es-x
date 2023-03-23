"use strict"

module.exports = { fetchLines }

async function* fetchLines(url) {
    const response = await fetch(url)
    const reader = response.body.getReader()
    let buffer = ""
    const decoder = new TextDecoder()
    while (true) {
        const { done, value: chunk } = await reader.read()
        if (done) {
            if (chunk) {
                buffer += decoder.decode(chunk)
            }
            yield buffer
            break
        }
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
}
