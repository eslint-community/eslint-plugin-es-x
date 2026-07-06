import { defineConfig } from "vitepress"
import path from "node:path"
import eslint4b from "vite-plugin-eslint4b"
import { categories } from "../../scripts/rules"
import monacoEditorPackageJson from "monaco-editor/package.json" with { type: "json" }

export default defineConfig({
    title: "eslint-plugin-es-x",
    base: "/eslint-plugin-es-x/",
    description: "ESLint plugin about ECMAScript syntax.",
    head: [["link", { rel: "icon", href: "/favicon.png" }]],

    outDir: path.resolve(import.meta.dirname, "./dist/eslint-plugin-es-x"),
    vite: {
        publicDir: path.resolve(import.meta.dirname, "./public"),
        plugins: [eslint4b()],
        define: {
            MONACO_EDITOR_VERSION: JSON.stringify(
                monacoEditorPackageJson.version,
            ),
        },
    },

    lastUpdated: true,
    themeConfig: {
        search: {
            provider: "local",
            options: {
                detailedView: true,
            },
        },
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
                    { text: "Available Configs", link: "/configs/" },
                    { text: "Available Rules", link: "/rules/" },
                ],
            },
            ...Object.values(categories)
                .filter(
                    (menu) => menu.rules.length && menu.specKind !== "proposal",
                )
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
