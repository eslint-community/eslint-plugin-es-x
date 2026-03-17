/**
 * Development shim so that require("./index.js") resolves correctly when
 * running under tsx. This file is excluded from the tsc build; consumers use
 * dist/index.js which is compiled directly from lib/index.ts.
 */
"use strict"

module.exports = require("./index.ts")
