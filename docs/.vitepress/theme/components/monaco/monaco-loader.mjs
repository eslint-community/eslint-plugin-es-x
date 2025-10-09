/* globals MONACO_EDITOR_VERSION */

function importFromCDN(path) {
    return import(/* @vite-ignore */ path)
}

async function setupMonaco() {
    if (typeof window !== "undefined") {
        const monacoScript =
            Array.from(document.head.querySelectorAll("script")).find(
                (script) =>
                    script.src &&
                    script.src.includes("monaco") &&
                    script.src.includes("vs/loader"),
            ) ||
            // If the script tag that loads the Monaco editor is not found, insert the script tag.
            (await appendMonacoEditorScript())

        // @ts-expect-error -- global Monaco's require
        window.require.config({
            paths: {
                vs: monacoScript.src.replace(/\/vs\/.*$/u, "/vs"),
            },
        })
    }
}

/** Load the Monaco editor. */
async function loadMonacoFromEsmCdn() {
    let error = new Error()
    const urlList = [
        {
            script: `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/+esm`,
            style: `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_EDITOR_VERSION}/min/vs/editor/editor.main.css`,
        },
        {
            script: "https://cdn.jsdelivr.net/npm/monaco-editor/+esm",
            style: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs/editor/editor.main.css",
        },
    ]
    for (const url of urlList) {
        try {
            const result = await importFromCDN(url.script)

            if (typeof document !== "undefined") {
                const link = document.createElement("link")
                link.rel = "stylesheet"
                link.href = url.style
                document.head.append(link)
            }
            return result
        } catch (e) {
            // eslint-disable-next-line no-console -- OK
            console.warn(`Failed to retrieve resource from ${url}`)
            error = e
        }
    }
    throw error
}

async function loadModuleFromMonaco(moduleName) {
    await setupMonaco()

    return new Promise((resolve) => {
        if (typeof window !== "undefined") {
            // @ts-expect-error -- global Monaco's require
            window.require([moduleName], (r) => {
                resolve(r)
            })
        }
    })
}

/** Appends a script tag that loads the Monaco editor. */
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
    const script = document.createElement("script")

    return new Promise((resolve, reject) => {
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

let monacoPromise = null

/** Load the Monaco editor object. */
export function loadMonacoEditor() {
    return (
        monacoPromise ||
        (monacoPromise = (async () => {
            let rawMonaco = undefined
            let monaco = undefined
            try {
                rawMonaco = await loadMonacoFromEsmCdn()
            } catch {
                rawMonaco = await loadModuleFromMonaco("vs/editor/editor.main")
            }
            if ("m" in rawMonaco) {
                monaco = rawMonaco.m || rawMonaco
            } else {
                monaco = rawMonaco
            }

            return monaco
        })())
    )
}
