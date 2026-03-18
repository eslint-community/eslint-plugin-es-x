import type monaco from "monaco-editor"
import { loadMonacoEditor } from "./monaco-loader.mjs"

interface SetupMonacoOptions {
    init: {
        value: string
        language: string
        readOnly?: boolean
        markers?: monaco.editor.IMarkerData[]
        right?: {
            value: string
            markers?: monaco.editor.IMarkerData[]
        }
    }
    listeners?: {
        onChangeValue?: (value: string) => void
        onDidChangeCursorPosition?: (
            evt: monaco.editor.ICursorPositionChangedEvent,
        ) => void
        onFocus?: () => void
    }
    useDiffEditor?: boolean
    rootElement: HTMLElement
}

export interface SetupMonacoResult {
    setModelLanguage(lang: string): void
    setLeftValue(code: string | monaco.editor.ITextSnapshot): void
    setRightValue(code: string | monaco.editor.ITextSnapshot): void
    setLeftMarkers(markers: monaco.editor.IMarkerData[]): void
    setRightMarkers(markers: monaco.editor.IMarkerData[]): void
    getLeftEditor(): monaco.editor.IStandaloneCodeEditor | null
    getRightEditor(): monaco.editor.IStandaloneCodeEditor | null

    registerCodeActionProvider(
        provideCodeActions: monaco.languages.CodeActionProvider["provideCodeActions"],
    ): void
    disposeEditor(): void
}

/** Setup editor */
export async function setupMonacoEditor({
    init,
    listeners,
    useDiffEditor,
    rootElement,
}: SetupMonacoOptions): Promise<SetupMonacoResult> {
    const monaco = await loadMonacoEditor()
    const language = init.language

    const options = {
        value: init.value,
        readOnly: init.readOnly,
        theme: "vs-dark",
        language,
        automaticLayout: true,
        fontSize: 14,
        fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        // tabSize: 2,
        minimap: {
            enabled: false,
        },
        renderControlCharacters: true,
        renderIndentGuides: true,
        renderValidationDecorations: "on",
        renderWhitespace: "boundary",
        scrollBeyondLastLine: false,
        scrollbar: { alwaysConsumeMouseWheel: false },
        unusualLineTerminators: "off",
    } as const

    if (useDiffEditor) {
        const diffEditor = monaco.editor.createDiffEditor(rootElement, {
            originalEditable: true,
            ...options,
        })
        const original = monaco.editor.createModel(init.value, language)
        const modified = monaco.editor.createModel(
            init.right?.value || "",
            language,
        )

        const leftEditor = diffEditor.getOriginalEditor()
        const rightEditor = diffEditor.getModifiedEditor()
        rightEditor.updateOptions({ readOnly: true })
        diffEditor.setModel({ original, modified })
        original.onDidChangeContent(() => {
            const value = original.getValue()
            listeners?.onChangeValue?.(value)
        })
        leftEditor.onDidChangeCursorPosition((evt) => {
            listeners?.onDidChangeCursorPosition?.(evt)
        })
        leftEditor.onDidFocusEditorText(() => {
            listeners?.onFocus?.()
        })

        const registerCodeActionProvider = buildRegisterCodeActionProvider(
            leftEditor,
            language,
        )

        const result = {
            setModelLanguage(lang: string) {
                for (const model of [original, modified]) {
                    monaco.editor.setModelLanguage(model, lang)
                }
                registerCodeActionProvider.setLanguage(lang)
            },
            setLeftValue(code: string | monaco.editor.ITextSnapshot) {
                const value = original.getValue()
                if (code !== value) {
                    original.setValue(code)
                }
            },
            setRightValue(code: string | monaco.editor.ITextSnapshot) {
                const value = modified.getValue()
                if (code !== value) {
                    modified.setValue(code)
                }
            },
            setLeftMarkers(markers: monaco.editor.IMarkerData[]) {
                updateMarkers(leftEditor, markers)
            },
            setRightMarkers(markers: monaco.editor.IMarkerData[]) {
                updateMarkers(rightEditor, markers)
            },
            getLeftEditor: () => leftEditor,
            getRightEditor: () => rightEditor,

            registerCodeActionProvider: registerCodeActionProvider.register,
            disposeEditor() {
                registerCodeActionProvider.dispose()
                leftEditor.getModel()?.dispose()
                rightEditor.getModel()?.dispose()
                leftEditor.dispose()
                rightEditor.dispose()
                diffEditor.dispose()
            },
        }
        if (init.markers) {
            result.setLeftMarkers(init.markers)
        }
        if (init.right?.markers) {
            result.setRightMarkers(init.right?.markers)
        }

        return result
    }
    const standaloneEditor = monaco.editor.create(rootElement, options)

    standaloneEditor.onDidChangeModelContent(() => {
        const value = standaloneEditor.getValue()
        listeners?.onChangeValue?.(value)
    })
    standaloneEditor.onDidChangeCursorPosition((evt) => {
        listeners?.onDidChangeCursorPosition?.(evt)
    })
    standaloneEditor.onDidFocusEditorText(() => {
        listeners?.onFocus?.()
    })

    const registerCodeActionProvider = buildRegisterCodeActionProvider(
        standaloneEditor,
        language,
    )
    const result = {
        setModelLanguage(lang: string) {
            const model = standaloneEditor.getModel()
            if (model) {
                monaco.editor.setModelLanguage(model, lang)
            }
            registerCodeActionProvider.setLanguage(lang)
        },
        setLeftValue(code: string) {
            const value = standaloneEditor.getValue()
            if (code !== value) {
                standaloneEditor.setValue(code)
            }
        },
        setRightValue() {
            /* noop */
        },
        setLeftMarkers(markers: monaco.editor.IMarkerData[]) {
            updateMarkers(standaloneEditor, markers)
        },
        setRightMarkers() {
            /* noop */
        },
        getLeftEditor: () => standaloneEditor,
        getRightEditor: () => null,

        registerCodeActionProvider: registerCodeActionProvider.register,
        disposeEditor() {
            registerCodeActionProvider.dispose()
            standaloneEditor.getModel()?.dispose()
            standaloneEditor.dispose()
        },
    }
    if (init.markers) {
        result.setLeftMarkers(init.markers)
    }
    return result

    /** Update markers */
    function updateMarkers(
        editor: monaco.editor.IStandaloneCodeEditor,
        markers: monaco.editor.IMarkerData[],
    ) {
        const model = editor.getModel()!
        const id = editor.getId()
        monaco.editor.setModelMarkers(
            model,
            id,
            JSON.parse(JSON.stringify(markers)),
        )
    }

    function buildRegisterCodeActionProvider(
        editor: monaco.editor.IStandaloneCodeEditor,
        initLanguage: string,
    ) {
        let codeActionProviderDisposable = {
            dispose() {
                // void
            },
        }
        let currProvideCodeActions:
            | monaco.languages.CodeActionProvider["provideCodeActions"]
            | null = null
        let currLanguage = initLanguage

        function register() {
            codeActionProviderDisposable.dispose()
            codeActionProviderDisposable =
                monaco.languages.registerCodeActionProvider(currLanguage, {
                    provideCodeActions(model, ...args) {
                        if (
                            !currProvideCodeActions ||
                            editor.getModel()!.uri !== model.uri
                        ) {
                            return {
                                actions: [],
                                dispose() {
                                    /* nop */
                                },
                            }
                        }
                        return currProvideCodeActions(model, ...args)
                    },
                })
        }

        return {
            setLanguage(lang: string) {
                currLanguage = lang
                register()
            },
            register(
                provideCodeActions: monaco.languages.CodeActionProvider["provideCodeActions"],
            ) {
                currProvideCodeActions = provideCodeActions
                register()
            },
            dispose() {
                codeActionProviderDisposable.dispose()
            },
        }
    }
}
