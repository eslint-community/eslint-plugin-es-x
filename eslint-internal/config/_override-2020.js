/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
    },
    globals: {
        BigInt: "readonly",
        BigInt64Array: "readonly",
        BigUint64Array: "readonly",
    },
}
