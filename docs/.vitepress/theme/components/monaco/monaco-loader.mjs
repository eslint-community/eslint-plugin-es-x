/* globals MONACO_EDITOR_VERSION */
async function setupMonaco() {
    if (typeof window !== "undefined") {
        const monacoScript =
            Array.from(document.head.querySelectorAll("script")).find(
                (script) =>
                    script.src &&
                    script.src.includes("monaco") &&
                    script.src.includes("vs/loader"),
            ) || (await appendMonacoEditorScript())

        // @ts-expect-error -- global Monaco's require
        window.require.config({
            paths: {
                vs: monacoScript.src.replace(/\/vs\/.*$/u, "/vs"),
            },
        })
    }
}

async function appendMonacoEditorScript() {
    let error = new Error()
    const urlList = [
        `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${MONACO_EDITOR_VERSION}/min/vs/loader.min.js`,
        `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/dev/vs/loader.min.js`,
        `https://unpkg.com/monaco-editor/${MONACO_EDITOR_VERSION}/min/vs/loader.min.js`,
        "https://cdn.jsdelivr.net/npm/monaco-editor/dev/vs/loader.min.js",
        "https://unpkg.com/monaco-editor@latest/min/vs/loader.js",
    ]
    for (const url of urlList) {
        try {
            return await appendScript(url)
        } catch (e) {
            // eslint-disable-next-line no-console -- OK
            console.warn(`Failed to retrieve resource from ${url}`)
            error = e
        }
    }
    throw error
}

/** Appends a script tag. */
function appendScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.onload = () => {
            script.onload = null

            watch()

            function watch() {
                // @ts-expect-error -- global Monaco's require
                if (window.require) {
                    resolve(script)
                    return
                }
                setTimeout(watch, 200)
            }
        }
        script.onerror = (e) => {
            reject(e)
            document.head.removeChild(script)
        }
        document.head.append(script)
    })
}

let setupedMonaco = null
let editorLoaded = null

export function loadMonacoEngine() {
    return setupedMonaco || (setupedMonaco = setupMonaco())
}
export function loadMonacoEditor() {
    if (editorLoaded) {
        return editorLoaded
    }
    return (editorLoaded = (async () => {
        const monaco = await loadModuleFromMonaco("vs/editor/editor.main")
        return monaco
    })())
}

export async function loadModuleFromMonaco(moduleName) {
    await loadMonacoEngine()
    return new Promise((resolve) => {
        if (typeof window !== "undefined") {
            // @ts-expect-error -- global Monaco's require
            window.require([moduleName], (r) => {
                resolve(r)
            })
        }
    })
}
