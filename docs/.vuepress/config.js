/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const { categories } = require("../../scripts/rules")
require("../../scripts/update-docs-readme")

module.exports = {
    title: "eslint-plugin-es-x",
    base: "/eslint-plugin-es-x/",
    description: "ESLint plugin about ECMAScript syntax.",
    evergreen: true,

    enhanceAppFiles: require.resolve("./enhanceApp.mjs"),
    configureWebpack(_config, _isServer) {
        return {
            externals: {
                typescript: "typescript",
            },
            resolve: {
                alias: {
                    esquery: path.resolve(
                        __dirname,
                        "../../node_modules/esquery/dist/esquery.min.js",
                    ),
                    "@eslint/eslintrc/universal": path.resolve(
                        __dirname,
                        "../../node_modules/@eslint/eslintrc/dist/eslintrc-universal.cjs",
                    ),
                },
            },
        }
    },

    themeConfig: {
        repo: "ota-meshi/eslint-plugin-es-x",
        docsRepo: "ota-meshi/eslint-plugin-es-x",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,

        nav: [
            { text: "Guide", link: "/" },
            { text: "Rules", link: "/rules/" },
        ],

        sidebarDepth: 0,
        sidebar: [
            "/",
            "/rules/",
            ...Object.values(categories)
                .filter((menu) => menu.rules.length)
                .map((category) => ({
                    title: category.title,
                    collapsable: false,
                    children: category.rules.map(({ ruleId }) => [
                        `/rules/${ruleId}`,
                        `es-x/${ruleId}`,
                    ]),
                })),
        ],
    },
}
