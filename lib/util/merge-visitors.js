"use strict"

function mergeVisitors(...visitors) {
    return visitors.reduce((acc, visitor) => {
        for (const [key, callback] of Object.entries(visitor)) {
            const oldCallback = acc[key]
            if (oldCallback) {
                acc[key] = (...args) => {
                    oldCallback(...args)
                    callback(...args)
                }
            } else {
                acc[key] = callback
            }
        }
        return acc
    }, {})
}

module.exports = { mergeVisitors }
