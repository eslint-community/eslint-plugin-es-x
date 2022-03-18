<template>
    <eslint-editor
        ref="editor"
        :linter="linter"
        :config="config"
        :code="cookedCode"
        :class="`eslint-playground-${type}`"
        class="eslint-playground"
        dark
        :fix="fix"
    />
</template>

<script>
import EslintEditor from "vue-eslint-editor"
import { rules } from "../../../"

export default {
    name: "ESLintPlayground",
    components: { EslintEditor },

    props: {
        // For no-json-superset
        code: {
            type: String,
            default: undefined,
        },
        fix: {
            type: Boolean,
        },
        type: {
            type: String,
            required: true,
            validator(value) {
                return value === "bad" || value === "good"
            },
        },
        sourceType: {
            type: String,
            default: undefined,
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
                    sourceType: this.sourceType || "module",
                },
                settings: {
                    "es-x": { aggressive: true },
                },
            },
            linter: null,
        }
    },

    computed: {
        cookedCode() {
            if (this.code && this.code.trim()) {
                return (this.code || "").replace(
                    /&#x([0-9a-zA-Z]+);/gu,
                    (_, codePoint) =>
                        String.fromCodePoint(parseInt(codePoint, 16)),
                )
            }

            return `${computeCodeFromSlot(this.$slots.default).trim()}\n`
        },
    },

    async mounted() {
        // Load linter.
        const { Linter } = await import("eslint/lib/linter")
        const linter = (this.linter = new Linter())

        for (const ruleId of Object.keys(rules)) {
            linter.defineRule(`es-x/${ruleId}`, rules[ruleId])
        }

        const editor = this.$refs.editor

        editor.$watch("codeEditor", () => {
            if (editor.codeEditor) {
                editor.codeEditor.onDidChangeModelDecorations(() =>
                    this.onDidChangeModelDecorations(editor.codeEditor),
                )
            }
        })
        editor.$watch("fixedCodeEditor", () => {
            if (editor.fixedCodeEditor) {
                editor.fixedCodeEditor.onDidChangeModelDecorations(() =>
                    this.onDidChangeModelDecorations(editor.fixedCodeEditor),
                )
            }
        })
    },

    methods: {
        onDidChangeModelDecorations(editor) {
            const { monaco } = this.$refs.editor
            const model = editor.getModel()
            monaco.editor.setModelMarkers(model, "javascript", [])
        },
    },
}

/**
 * @param {VNode[]} nodes
 * @returns {string}
 */
function computeCodeFromSlot(nodes) {
    if (!Array.isArray(nodes)) {
        return ""
    }
    return nodes
        .map((node) => node.text || computeCodeFromSlot(node.children))
        .join("")
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
