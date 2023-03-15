"use strict"

const https = require("https")

module.exports = { fetchLines }

function fetchLines(url) {
    const linesBuffer = []

    let resolve = undefined
    let reject = undefined

    function pushNext() {
        linesBuffer.push(
            new Promise((res, rej) => {
                resolve = res
                reject = rej
            }),
        )
    }

    function resolveLine(line) {
        resolve({ value: line })
        pushNext()
    }

    pushNext()

    const itr = {
        [Symbol.asyncIterator]() {
            return {
                next() {
                    return linesBuffer.shift()
                },
            }
        },
    }
    https
        .get(url, (res) => {
            let buffer = ""
            res.setEncoding("utf8")
            res.on("data", (chunk) => {
                const lines = (buffer + String(chunk)).split("\n")
                if (lines.length === 1) {
                    buffer = lines[0]
                } else {
                    buffer = lines.pop()
                    for (const line of lines) {
                        resolveLine(line)
                    }
                }
            })
            res.on("end", () => {
                if (buffer) {
                    resolveLine(buffer)
                }
                resolve({ done: true, value: undefined })
            })
            res.on("error", (e) => {
                reject(e)
            })
        })
        .on("error", (e) => {
            reject(e)
        })

    return itr
}
