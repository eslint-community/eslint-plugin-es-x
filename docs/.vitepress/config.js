"use strict"

const { defineConfig } = require("vitepress")
const path = require("path")

const { categories } = require("../../scripts/rules.js")
const { viteCommonjs, vitePluginRequireResolve } = require("./vite-plugin")
const { default: eslint4b } = require("vite-plugin-eslint4b")

module.exports = defineConfig({
    title: "eslint-plugin-es-x",
    base: "/eslint-plugin-es-x/",
    description: "ESLint plugin about ECMAScript syntax.",
    head: [["link", { rel: "icon", href: "/favicon.png" }]],

    outDir: path.resolve(__dirname, "./dist/eslint-plugin-es-x"),
    vite: {
        publicDir: path.resolve(__dirname, "./public"),
        plugins: [eslint4b(), vitePluginRequireResolve(), viteCommonjs()],
        define: {
            MONACO_EDITOR_VERSION: JSON.stringify(
                require("monaco-editor/package.json").version,
            ),
        },
    },

    lastUpdated: true,
    themeConfig: {
        editLink: {
            pattern:
                "https://github.com/eslint-community/eslint-plugin-es-x/edit/master/docs/:path",
        },
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/eslint-community/eslint-plugin-es-x",
            },
        ],

        nav: [
            { text: "Guide", link: "/" },
            { text: "Rules", link: "/rules/" },
        ],

        sidebar: [
            {
                items: [
                    { text: "Guide", link: "/" },
                    { text: "Available Rules", link: "/rules/" },
                ],
            },
            ...Object.values(categories)
                .filter((menu) => menu.rules.length)
                .map((category) => ({
                    text: category.title,
                    items: category.rules.map(({ ruleId }) => ({
                        text: `es-x/${ruleId}`,
                        link: `/rules/${ruleId}`,
                    })),
                })),
        ],
    },
})
