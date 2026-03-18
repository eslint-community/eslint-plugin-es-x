<script setup lang="ts">
import type monaco from "monaco-editor"
import {
    loadMonacoEditor,
    setupMonacoEditor,
    type SetupMonacoResult,
} from "./monaco/index.mjs"
import { onBeforeUnmount, onMounted, ref, watch } from "vue"
import type { SourceLocation } from "estree"

interface Props {
    modelValue?: string
    rightCode?: string
    language?: string
    readOnly?: boolean
    diffEditor?: boolean
    markers: monaco.editor.IMarkerData[]
    rightMarkers: monaco.editor.IMarkerData[]
    provideCodeActions?:
        | monaco.languages.CodeActionProvider["provideCodeActions"]
        | null
    waiting?: Promise<unknown> | null
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: "",
    rightCode: "",
    language: "",
    markers: () => [],
    rightMarkers: () => [],
    provideCodeActions: null,
    waiting: null,
})

const emit = defineEmits<{
    "update:modelValue": [string]
    changeCursorPosition: [monaco.editor.ICursorPositionChangedEvent]
    focusEditorText: []
    mountedEditor: []
}>()

const rootElement = ref<HTMLDivElement | null>(null)
// let editor: MEditor.IStandaloneDiffEditor | MEditor.IStandaloneCodeEditor | null = null;
// eslint-disable-next-line func-style -- variable
let setModelLanguage: SetupMonacoResult["setModelLanguage"] = () => {
    // init
}
// eslint-disable-next-line func-style -- variable
let setLeftValue: SetupMonacoResult["setLeftValue"] = () => {
    // init
}
// eslint-disable-next-line func-style -- variable
let setRightValue: SetupMonacoResult["setRightValue"] = () => {
    // init
}
// eslint-disable-next-line func-style -- variable
let setLeftMarkers: SetupMonacoResult["setLeftMarkers"] = () => {
    // init
}
// eslint-disable-next-line func-style -- variable
let setRightMarkers: SetupMonacoResult["setRightMarkers"] = () => {
    // init
}
// eslint-disable-next-line func-style -- variable
let getLeftEditor: SetupMonacoResult["getLeftEditor"] = () => null
// eslint-disable-next-line func-style -- variable
let getRightEditor: SetupMonacoResult["getRightEditor"] = () => null
// eslint-disable-next-line func-style -- variable
let disposeEditor: SetupMonacoResult["disposeEditor"] = () => {
    // init
}
// eslint-disable-next-line func-style -- variable
let registerCodeActionProvider: SetupMonacoResult["registerCodeActionProvider"] =
    () => {
        // init
    }

const loading = ref(true)
onMounted(async () => {
    const loadingMonaco = loadMonacoEditor()
    await Promise.all([props.waiting, loadingMonaco])
    loading.value = false
})

watch(rootElement, () => {
    setup()
})
watch(
    () => props.modelValue,
    (value) => {
        setLeftValue(value)
    },
)
watch(
    () => props.rightCode,
    (value) => {
        setRightValue(value)
    },
)
watch(
    () => props.language,
    (value) => {
        setModelLanguage(value)
    },
)
watch(
    () => props.markers,
    (value) => {
        setLeftMarkers(value)
    },
)
watch(
    () => props.rightMarkers,
    (value) => {
        setRightMarkers(value)
    },
)
watch(
    () => props.provideCodeActions,
    (value) => {
        if (value) {
            registerCodeActionProvider(value)
        }
    },
)

watch(
    () => props.diffEditor,
    () => {
        setup()
    },
)

/** setup monaco */
async function setup() {
    disposeEditor()
    if (loading.value) {
        return
    }

    // eslint-disable-next-line require-atomic-updates -- no problem
    ;({
        getLeftEditor,
        getRightEditor,
        setLeftMarkers,
        setLeftValue,
        setModelLanguage,
        setRightMarkers,
        setRightValue,
        disposeEditor,
        registerCodeActionProvider,
    } = await setupMonacoEditor({
        init: {
            value: props.modelValue,
            markers: props.markers,
            right: {
                value: props.rightCode,
                markers: props.rightMarkers,
            },
            language: props.language,
            readOnly: props.readOnly,
        },
        listeners: {
            onChangeValue(value) {
                emit("update:modelValue", value)
            },
            onDidChangeCursorPosition(evt) {
                emit("changeCursorPosition", evt)
            },
            onFocus() {
                emit("focusEditorText")
            },
        },
        rootElement: rootElement.value!,
        useDiffEditor: Boolean(props.diffEditor),
    }))

    if (props.provideCodeActions) {
        registerCodeActionProvider(props.provideCodeActions)
    }

    emit("mountedEditor")
}

onBeforeUnmount(() => {
    disposeEditor()
})

/** Set cursor position */
function setCursorPosition(loc: SourceLocation) {
    const leftEditor = getLeftEditor()
    if (leftEditor) {
        leftEditor.setSelection({
            startLineNumber: loc.start.line,
            startColumn: loc.start.column,
            endLineNumber: loc.end.line,
            endColumn: loc.end.column,
        })
        leftEditor.revealLineInCenter(loc.start.line)
    }
}

defineExpose({
    setCursorPosition,
    getLeftEditor() {
        return getLeftEditor()
    },
    getRightEditor() {
        return getRightEditor()
    },
})
</script>

<template>
    <div class="monaco-editor-root">
        <Transition name="monaco-editor-fade">
            <div
                v-if="!loading"
                key="editor"
                class="monaco-editor-swap-container"
            >
                <div ref="rootElement" class="monaco-editor-monaco" />
                <slot name="actions" />
            </div>
            <div v-else key="placeholder" class="monaco-editor-swap-container">
                <code class="monaco-editor-placeholder-code">{{
                    props.modelValue
                }}</code>
                <Transition name="monaco-editor-fade">
                    <div
                        key="loading"
                        class="monaco-editor-placeholder-loading"
                    >
                        <div class="monaco-editor-placeholder-loading-icon">
                            <div />
                            <div />
                            <div />
                        </div>
                        <div class="monaco-editor-placeholder-loading-message">
                            Now loading...
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.monaco-editor-root {
    position: relative;
}

.monaco-editor-swap-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.monaco-editor-monaco {
    width: 100%;
    height: 100%;
}

.monaco-editor-root .monaco-editor-placeholder-code {
    display: block;
    box-sizing: border-box;
    height: 100%;
    white-space: pre;
    background-color: #1e1e1e;
    color: #d4d4d4;
}

.monaco-editor-placeholder-loading,
.monaco-editor-placeholder-error {
    position: absolute;
    right: 8px;
    bottom: 8px;
    pointer-events: none;
}

.monaco-editor-placeholder-loading {
    line-height: 1.5em;
}

.monaco-editor-placeholder-error {
    color: #f44336;
}

.monaco-editor-placeholder-loading-icon {
    display: inline-block;
    position: relative;
    width: 1.5em;
    height: 1.5em;
    margin-right: 4px;
    vertical-align: middle;
}
.monaco-editor-placeholder-loading-icon > div {
    position: absolute;
    border-radius: 50%;
    border-color: #3eaf7c;
    border-width: 2px;
    border-style: none solid none solid;
    animation: SiteKitMonacotEditorLoadingIcon 1s linear infinite;
}
.monaco-editor-placeholder-loading-icon > div:nth-child(1) {
    height: 100%;
    width: 100%;
    animation-duration: 1.3s;
}
.monaco-editor-placeholder-loading-icon > div:nth-child(2) {
    top: 1px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 2px);
    animation-duration: 0.7s;
}
.monaco-editor-placeholder-loading-icon > div:nth-child(3) {
    top: 2px;
    left: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 4px);
    animation-duration: 1s;
}

.monaco-editor-placeholder-loading-message {
    display: inline-block;
    color: gray;
    vertical-align: middle;
}

@keyframes SiteKitMonacotEditorLoadingIcon {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(210deg);
    }
    100% {
        transform: rotateY(360deg);
    }
}

.monaco-editor-fade-enter-active,
.monaco-editor-fade-leave-active {
    transition: opacity 0.3s ease;
}
.monaco-editor-fade-enter,
.monaco-editor-fade-leave-to {
    opacity: 0;
}
</style>
