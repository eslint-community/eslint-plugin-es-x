"use strict"

const fs = require("fs")
const path = require("path")
const rulesRoot = path.resolve(__dirname, "./rules")

const rules = {}

for (const entry of fs.readdirSync(rulesRoot, {
    withFileTypes: true,
    recursive: true,
})) {
    if (!entry.isFile() || !entry.name.endsWith(".js")) {
        continue
    }
    const fullPath = path.join(entry.parentPath, entry.name)
    rules[
        path
            .relative(rulesRoot, fullPath)
            .replace(/\\/gu, "/")
            .replace(/\.js$/u, "")
    ] = require(path.join(fullPath))
}

module.exports = { rules }
