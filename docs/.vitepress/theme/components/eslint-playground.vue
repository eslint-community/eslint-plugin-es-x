<script lang="ts" setup>
import EslintEditor from "./eslint-editor.vue"
import { markRaw, ref, reactive, computed, onMounted, useSlots } from "vue"
import * as plugin from "../../../../lib/index.js"
import * as globals from "globals"
const { rules } = plugin.default || plugin
const { builtin } = globals.default || globals

const props = defineProps({
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
        default: "module",
    },
    filename: {
        type: String,
        default: "example.js",
    },
    language: {
        type: String,
        default: "javascript",
    },
})

const cookedCode = ref("")
const height = ref("100px")
const linter = ref(undefined)
const format = reactive({
    insertSpaces: true,
    tabSize: 2,
})

const config = computed(() => ({
    plugins: {
        "es-x": {
            rules,
        },
    },
    languageOptions: {
        sourceType: props.sourceType,
        ecmaVersion: "latest",
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
        globals: {
            Float16Array: "readonly",
            ...builtin,
        },
    },
    rules: {},
    settings: {
        "es-x": { aggressive: true },
    },
}))

onMounted(async () => {
    if (props.code && props.code.trim()) {
        cookedCode.value = (props.code || "").replace(
            /&#x([0-9a-zA-Z]+);/gu,
            (_, codePoint) => String.fromCodePoint(parseInt(codePoint, 16)),
        )
    } else {
        cookedCode.value = `${computeCodeFromSlot(
            findCode(useSlots().default?.()),
        ).trim()}\n`
    }
    const lines = cookedCode.value.split("\n").length
    height.value = `${Math.max(120, 20 * (1 + lines))}px`
    // Load linter.
    const [{ Linter }] = await Promise.all([import("eslint")])

    linter.value = markRaw(new Linter())
})

/**
 * Find VNode of <code> tag
 */
function findCode(n) {
    const nodes = Array.isArray(n) ? n : [n]
    for (const node of nodes) {
        if (!node) {
            continue
        }
        if (node.type === "code") {
            return node
        }
        const c = findCode(node.children)
        if (c) {
            return c
        }
    }
    return null
}

/**
 * Extract text
 */
function computeCodeFromSlot(n) {
    if (!n) {
        return ""
    }
    const nodes = Array.isArray(n) ? n : [n]
    // debugger
    return nodes
        .map((node) =>
            typeof node === "string"
                ? node
                : computeCodeFromSlot(node.children),
        )
        .join("")
}
</script>

<template>
    <div
        class="eslint-playground-container"
        :class="`eslint-playground-${type}`"
    >
        <eslint-editor
            v-model:code="cookedCode"
            :linter="linter"
            :config="config"
            :style="{ height }"
            class="eslint-playground"
            :filename="filename"
            :language="language"
            dark
            :format="format"
            :fix="fix"
        />
    </div>
</template>

<style>
.eslint-playground-container {
    border-radius: 6px;
    padding: 1.25rem 0;
    margin: 1em 0;
    background-color: #1e1e1e;
    border-style: solid;
}

.eslint-playground {
    width: 100%;
}

.eslint-playground-good {
    border-color: #4caf50;
}
.eslint-playground-bad {
    border-color: #f44336;
}
</style>
