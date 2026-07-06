/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const files = ["**/scripts/**/*", "eslint.config.ts"]

module.exports = [
    ...require("./+node.cjs").map((config) => ({ ...config, files })),
    {
        name: "eslint-internal/config/_override-special.cjs",
        files,
        rules: {
            "no-console": "off",
            "no-process-env": "off",
        },
    },
]
