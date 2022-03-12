/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    overrides: [
        {
            files: [
                "**/scripts/**/*",
                ".babelrc.js",
                ".eslintrc.js",
                "webpack.config.js",
                "**/.vuepress/config.js",
                "*.webpack.config.js",
            ],
            extends: [require.resolve("./+node.js")],
            rules: {
                "no-console": "off",
                "no-process-env": "off",
            },
        },
        {
            files: [
                "**/scripts/rollup-plugin/**/*",
                "rollup.config.js",
                "*.rollup.config.js",
            ],
            extends: [
                require.resolve("./+node.js"),
                require.resolve("./+modules.js"),
            ],
            rules: {
                "no-console": "off",
                "no-process-env": "off",
            },
        },
    ],
}
