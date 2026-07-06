import { defineConfig } from "tsdown"

export default defineConfig({
    clean: true,
    entry: ["lib/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    treeshake: true,
})
