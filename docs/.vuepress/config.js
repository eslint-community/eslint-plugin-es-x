/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { categories } = require("../../scripts/rules")
require("../../scripts/update-docs-readme")

module.exports = {
    title: "eslint-plugin-es-x",
    base: "/eslint-plugin-es-x/",
    description: "ESLint plugin about ECMAScript syntax.",
    evergreen: true,

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
