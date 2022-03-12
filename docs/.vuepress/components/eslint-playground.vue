<template>
    <eslint-editor
        :linter="linter"
        :config="config"
        :code="cookedCode"
        :class="`eslint-playground-${type}`"
        class="eslint-playground"
        dark
        fix
    />
</template>

<script>
import EslintEditor from "vue-eslint-editor"
import { rules } from "../../../"

export default {
    name: "ESLintPlayground",
    components: { EslintEditor },

    props: {
        code: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            validator(value) {
                return value === "bad" || value === "good"
            },
        },
    },

    data() {
        return {
            config: {
                globals: {
                    // ES2015 globals
                    ArrayBuffer: false,
                    DataView: false,
                    Float32Array: false,
                    Float64Array: false,
                    Int16Array: false,
                    Int32Array: false,
                    Int8Array: false,
                    Map: false,
                    Promise: false,
                    Proxy: false,
                    Reflect: false,
                    Set: false,
                    Symbol: false,
                    Uint16Array: false,
                    Uint32Array: false,
                    Uint8Array: false,
                    Uint8ClampedArray: false,
                    WeakMap: false,
                    WeakSet: false,
                    // ES2017 globals
                    Atomics: false,
                    SharedArrayBuffer: false,
                    // ES2020 globals
                    BigInt: false,
                    BigInt64Array: false,
                    BigUint64Array: false,
                    globalThis: true,
                    // ES2021 globals
                    AggregateError: false,
                    FinalizationRegistry: false,
                    WeakRef: false,
                },
                rules: {},
                parserOptions: {
                    ecmaVersion: 2022,
                    sourceType: "module",
                },
                settings: {
                    es: { aggressive: true },
                },
            },
            linter: null,
        }
    },

    computed: {
        cookedCode() {
            return (this.code || "").replace(
                /&#x([0-9a-zA-Z]+);/gu,
                (_, codePoint) => String.fromCodePoint(parseInt(codePoint, 16)),
            )
        },
    },

    async mounted() {
        // Load linter.
        const { default: Linter } = await import("eslint4b/dist/linter")
        const linter = (this.linter = new Linter())

        for (const ruleId of Object.keys(rules)) {
            linter.defineRule(`es/${ruleId}`, rules[ruleId])
        }
    },
}
</script>

<style>
.eslint-playground {
    width: 100%;
    min-height: 240px;
    box-sizing: border-box;
    border: 1.5px solid gray;
}
.eslint-playground-good {
    border-color: #4caf50;
}
.eslint-playground-bad {
    border-color: #f44336;
}
</style>
