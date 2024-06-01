/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const files = ["**/scripts/**/*", "eslint.config.js"]

module.exports = [
    ...require("./+node.js").map((config) => ({ ...config, files })),
    {
        name: "eslint-internal/config/_override-special.js",
        files,
        rules: {
            "no-console": "off",
            "no-process-env": "off",
        },
    },
]
