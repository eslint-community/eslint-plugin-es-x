/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
require("../../scripts/update-docs-readme")

module.exports = {
    base: "/eslint-plugin-es/",
    title: "eslint-plugin-es",
    description: "ESLint plugin about ECMAScript syntax.",
    serviceWorker: true,
    ga: "UA-12936571-6",

    themeConfig: {
        repo: "mysticatea/eslint-plugin-es",
        docsRepo: "mysticatea/eslint-plugin-es",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,
        lastUpdated: true,

        nav: [
            { text: "Guide", link: "/guide/getting-started.md" },
            { text: "Rules", link: "/rules/" },
        ],

        sidebar: [
            {
                title: "Guide",
                collapsable: false,
                children: fs
                    .readdirSync("docs/guide")
                    .map(file => `/guide/${file}`),
            },
            {
                title: "Rules",
                collapsable: false,
                children: [
                    "/rules/",
                    ...fs
                        .readdirSync("docs/rules")
                        .filter(file => file !== "README.md")
                        .map(file => [
                            `/rules/${file}`,
                            `es/${path.basename(file, ".md")}`,
                        ]),
                ],
            },
        ],
    },
}
