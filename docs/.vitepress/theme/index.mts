if (typeof globalThis.require === "undefined") {
    ;(globalThis as any).require = () => {
        const e = new Error("require is not defined")
        ;(e as any).code = "MODULE_NOT_FOUND"
        throw e
    }
}
import type { Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import { defineAsyncComponent } from "vue"
import Layout from "./Layout.vue"
import "./style.css"

const theme: Theme = {
    ...DefaultTheme,
    Layout,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx)
        ctx.app.component(
            "eslint-playground",
            defineAsyncComponent({
                loader: () => import("./components/eslint-playground.vue"),
            }),
        )
    },
}
export default theme
