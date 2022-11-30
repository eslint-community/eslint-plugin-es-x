/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const { ESLint } = require("eslint")
const { rules } = require("./rules")
const plugin = require("..")

main()

/**
 * Get since from frontmatter or package.json
 */
function getSince(content) {
    const fileIntro = /^---\n((?:.*\n)+)---\n*/u.exec(content)
    if (fileIntro) {
        const since = /since: "?([^"]+)"?/u.exec(fileIntro[0])
        if (since) {
            return since[1].trim()
        }
    }

    if (process.env.IN_VERSION_SCRIPT) {
        return `v${require("../package.json").version}`
    }
    return null
}

async function main() {
    const docsRoot = path.resolve(__dirname, "../docs/rules/")
    const configRoot = path.resolve(__dirname, "../lib/configs/")
    const configs = []
    for (const filename of fs.readdirSync(configRoot)) {
        const id = `plugin:es-x/${path.basename(filename, ".js")}`
        const overrideConfigFile = path.join(configRoot, filename)
        const engine = new ESLint({
            overrideConfigFile,
            useEslintrc: false,
            plugins: { "es-x": plugin },
        })
        const config = await engine.calculateConfigForFile("a.js")
        const ruleIds = new Set(Object.keys(config.rules))
        configs.push({ id, ruleIds })
    }
    const collator = new Intl.Collator("en", { numeric: true })

    for (const { ruleId, description, fixable } of rules) {
        const filePath = path.join(docsRoot, `${ruleId}.md`)
        const originalContent = fs.readFileSync(filePath, "utf8")
        const since = getSince(originalContent)

        let content = originalContent
            .replace(/^\n*(?:---[\s\S]*?---\n\n?)?#.+\n>.+\n+(?:- .+\n)*/u, "")
            .replace(/## 🚀 Version[\s\S]+/u, "")
            .replace(/## 📚 References[\s\S]+/u, "")
            .trim()
        content = updateCodeBlocks(content, { ruleId, fixable })
        content = adjustContents(content)
        const enabledConfigIds = configs
            .filter((c) => c.ruleIds.has(`es-x/${ruleId}`))
            .map((c) => `\`${c.id}\``)
            .sort(collator.compare.bind(collator))
        const frontmatter = [
            "---",
            `title: "es-x/${ruleId}"`,
            `description: ${yamlValue(description)}`,
            ...(since ? [`since: ${yamlValue(since)}`] : []),
            "---",
        ]
        const headerLines = [`# es-x/${ruleId}`, `> ${description}`, ""]

        if (!since) {
            headerLines.push(
                '- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>',
            )
        }

        if (enabledConfigIds.length > 0) {
            headerLines.push(
                `- ✅ The following configurations enable this rule: ${new Intl.ListFormat(
                    "en",
                    { type: "conjunction" },
                ).format(enabledConfigIds)}`,
            )
        }
        if (fixable) {
            headerLines.push(
                "- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.",
            )
        }

        const newContent = `${frontmatter.join("\n").trim()}

${headerLines.join("\n").trim()}

${content}${
            since
                ? `

## 🚀 Version

This rule was introduced in ${since}.${
                      since.includes("[eslint-plugin-es]")
                          ? `

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es`
                          : ""
                  }`
                : ""
        }

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/${ruleId}.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/${ruleId}.js)
`

        fs.writeFileSync(filePath, newContent)
    }
}

/** Convert yaml value */
function yamlValue(val) {
    if (typeof val === "string") {
        return `"${val.replace(/\\/gu, "\\\\").replace(/"/gu, '\\"')}"`
    }
    return val
}

function updateCodeBlocks(content, { fixable }) {
    let result = ""
    let offset = 0
    let tagStartOffset = undefined
    while (
        (tagStartOffset = content.indexOf("<eslint-playground", offset)) >= 0
    ) {
        result += content.slice(offset, tagStartOffset)

        const attrsData = parseAttrs(
            tagStartOffset + "<eslint-playground".length,
        )
        const newAttrs = attrsData.attrs.filter(({ key }) => key !== "fix")
        if (fixable) {
            newAttrs.unshift({ key: "fix" })
        }

        const code = attrsData.attrs.find(({ key }) => key === "code")
        const isOld = attrsData.tagEnd === "/>" && code && code.value
        if (isOld) {
            // Convert from old <eslint-playground> style to new  <eslint-playground> style
            newAttrs.splice(newAttrs.indexOf(code), 1)
            attrsData.tagEnd = `>

\`\`\`js
${cookeHTMLAttrValue(code.value).trim()}
\`\`\`

</eslint-playground>`
        }

        result += `<eslint-playground ${newAttrs
            .map(({ key, value }) => (value ? `${key}=${value}` : key))
            .join(" ")}${attrsData.tagEnd === "/>" ? " />" : attrsData.tagEnd}`
        offset = attrsData.tagEndOffset
    }
    result += content.slice(offset)
    return result

    /** Parse attrs */
    function parseAttrs(startOffset) {
        const attrs = []

        const attrRegexp =
            /\/?>|([^\s=]+)(?:\s*=\s*("[^"]*?"|'[^']*?'|[^\s/>]+))?/gu
        attrRegexp.lastIndex = startOffset
        let match = null
        while ((match = attrRegexp.exec(content))) {
            if (match[0] === ">" || match[0] === "/>") {
                return {
                    tagEndOffset: match.index + match[0].length,
                    attrs,
                    tagEnd: match[0],
                }
            }
            attrs.push({ key: match[1], value: match[2] })
        }
        return {
            tagEndOffset: content.length,
            attrs,
            tagEnd: "",
        }
    }
}

function adjustContents(content) {
    // Adjust the necessary blank lines before and after the code block so that GitHub can recognize `.md`.
    let result = content
        .replace(/(<eslint-playground[\s\S]*?>)\n+```/gu, "$1\n\n```")
        .replace(/```\n+<\/eslint-playground>/gu, "```\n\n</eslint-playground>")

    // Convert from old style to new style
    result = result.replace("## Examples", "## 💡 Examples")

    return result
}

function cookeHTMLAttrValue(value) {
    return value
        .replace(/^['"]([\s\S]*)['"]$/u, "$1")
        .replace(/&#x([0-9a-zA-Z]+);/gu, (_, codePoint) =>
            String.fromCodePoint(parseInt(codePoint, 16)),
        )
        .replace(/&quot;/gu, '"')
        .replace(/&gt;/gu, ">")
        .replace(/&lt;/gu, "<")
        .trim()
}
