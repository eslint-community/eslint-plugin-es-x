"use strict"

const fs = require("node:fs")
const path = require("node:path")
const rulesRoot = path.resolve(__dirname, "./rules")

const rules = {}

for (const entry of fs.readdirSync(rulesRoot, {
    withFileTypes: true,
    recursive: true,
})) {
    if (!entry.isFile() || !entry.name.endsWith(".cjs")) {
        continue
    }
    const fullPath = path.join(entry.parentPath, entry.name)
    rules[
        path
            .relative(rulesRoot, fullPath)
            .replace(/\\/gu, "/")
            .replace(/\.cjs$/u, "")
    ] = require(path.join(fullPath))
}

module.exports = { rules }
