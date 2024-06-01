"use strict"

const fs = require("fs")
const path = require("path")
const rulesRoot = path.resolve(__dirname, "./rules")

const rules = {}

for (const entry of fs.readdirSync(rulesRoot, { withFileTypes: true })) {
    rules[entry.name.replace(/\.js$/u, "")] = require(
        path.join(rulesRoot, entry.name),
    )
}

module.exports = { rules }
