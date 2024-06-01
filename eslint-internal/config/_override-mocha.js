/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const files = ["**/test/**", "**/tests/**"]

module.exports = [
    ...require("./+node.js").map((config) => ({ ...config, files })),
    {
        name: "eslint-internal/config/_override-mocha.js",
        files,
        languageOptions: {
            globals: {
                after: "readonly",
                afterEach: "readonly",
                before: "readonly",
                beforeEach: "readonly",
                describe: "readonly",
                it: "readonly",
                mocha: "readonly",
                xdescribe: "readonly",
                xit: "readonly",
            },
        },
        rules: {
            "max-nested-callbacks": "off",
        },
    },
]
