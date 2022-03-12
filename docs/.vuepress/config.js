/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { categories } = require("../../scripts/rules")
require("../../scripts/update-docs-readme")

module.exports = {
    title: "eslint-plugin-es-x",
    base: "/eslint-plugin-ex-x/",
    description: "ESLint plugin about ECMAScript syntax.",
    evergreen: true,

    plugins: {
        "@vuepress/pwa": {
            serviceWorker: true,
            updatePopup: true,
        },
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
            ...Object.keys(categories)
                .map((category) => ({
                    title: category,
                    collapsable: false,
                    children: categories[category].rules.map(({ ruleId }) => [
                        `/rules/${ruleId}`,
                        `es-x/${ruleId}`,
                    ]),
                }))
                .filter((menu) => menu.children.length),
        ],
    },
}
