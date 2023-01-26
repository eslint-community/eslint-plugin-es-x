if (typeof globalThis.require === "undefined") {
    globalThis.require = () => {
        const e = new Error("require is not defined")
        e.code = "MODULE_NOT_FOUND"
        throw e
    }
}
import DefaultTheme from "vitepress/theme"
import { defineAsyncComponent } from "vue"
// @ts-expect-error -- ignore
import Layout from "./Layout.vue"
import "./style.css"

/** @type {import('vitepress').Theme} */
const theme = {
    ...DefaultTheme,
    Layout,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx)
        ctx.app.component(
            "eslint-playground",
            defineAsyncComponent({
                // @ts-expect-error -- ignore
                loader: () => import("./components/eslint-playground.vue"),
            }),
        )
    },
}
export default theme
