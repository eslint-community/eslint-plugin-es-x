/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const cp = require("child_process")
const fs = require("fs")
const path = require("path")
const prompts = require("@clack/prompts")
const { LATEST_ES_YEAR } = require("./rules")
const logger = console

const maxESVersion = LATEST_ES_YEAR + 1

main(
    String(process.argv[2])
        .toLowerCase()
        .replace(/[.]/gu, "-")
        .replace(/[()]/gu, ""),
)

// main
async function main(ruleId) {
    if (ruleId == null) {
        logger.error("Usage: npm run new <RuleID>")
        process.exitCode = 1
        return
    }
    if (!/^[a-z0-9-]+$/u.test(ruleId)) {
        logger.error("Invalid RuleID '%s'.", ruleId)
        process.exitCode = 1
        return
    }

    const ruleFile = path.resolve(__dirname, `../lib/rules/${ruleId}.js`)
    const testFile = path.resolve(__dirname, `../tests/lib/rules/${ruleId}.js`)
    const docFile = path.resolve(__dirname, `../docs/rules/${ruleId}.md`)
    const changesetFile = path.resolve(__dirname, `../.changeset/${ruleId}.md`)

    prompts.intro("Create the new rule!")

    const kind = await unwrapPrompt(
        prompts.select({
            message: `What kind of rule is ${ruleId}?`,
            options: [
                {
                    value: "global-object",
                    label: "The rule forbids the use of global objects.",
                },
                {
                    value: "static-properties",
                    label: "The rule forbids the use of static properties.",
                },
                // {
                //     value: "prototype-properties",
                //     label: "The rule forbids the use of prototype properties.",
                // },
                {
                    value: "nonstandard-static-properties",
                    label: "The rule forbids the use of non-standard static properties.",
                },
                {
                    value: "nonstandard-prototype-properties",
                    label: "The rule forbids the use of non-standard prototype properties.",
                },
                {
                    value: "default",
                    label: "There is no option",
                },
            ],
        }),
    )

    const resourceOptions = {
        ruleId,
        kind,
        object: "",
        properties: /** @type {string[]} */ [],
    }

    if (
        kind === "global-object" ||
        kind === "static-properties" ||
        kind === "prototype-properties" ||
        kind === "nonstandard-static-properties" ||
        kind === "nonstandard-prototype-properties"
    ) {
        resourceOptions.object = await unwrapPrompt(
            prompts.text({
                message: "What is the global object that the rule checks?",
                placeholder: "e.g. Set, Map, Math",
                validate(value) {
                    if (value.trim().length === 0) {
                        return "The global object name must not be empty."
                    }
                    return undefined
                },
            }),
        )
    }

    if (kind === "static-properties" || kind === "prototype-properties") {
        const promptObject = globalThis[resourceOptions.object]
        const promptProperties = promptObject
            ? kind === "static-properties"
                ? Object.getOwnPropertyNames(promptObject)
                : Object.getOwnPropertyNames(promptObject.prototype)
            : []
        resourceOptions.properties = (
            await unwrapPrompt(
                prompts.text({
                    message: "What is the property names that the rule checks?",
                    placeholder: promptProperties.length
                        ? `e.g. ${promptProperties.join(", ")}`
                        : undefined,
                    validate(value) {
                        const names = value
                            .split(",")
                            .map((s) => s.trim())
                            .filter((s) => s)
                        if (names.length === 0) {
                            return "The property names must not be empty."
                        }
                        return undefined
                    },
                }),
            )
        )
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)
    }

    const BUILDERS = {
        "global-object": buildGlobalObjectRuleResources,
        "static-properties": buildStaticPropertiesRuleResources,
        "nonstandard-static-properties":
            buildNonStandardStaticPropertiesRuleResources,
        "nonstandard-prototype-properties":
            buildNonStandardPrototypePropertiesRuleResources,
        default: buildDefaultResources,
    }

    const resources =
        BUILDERS[kind]?.(resourceOptions) ??
        buildDefaultResources(resourceOptions)

    fs.writeFileSync(ruleFile, resources.rule)
    fs.writeFileSync(testFile, resources.test)
    fs.writeFileSync(docFile, resources.doc)
    fs.writeFileSync(
        changesetFile,
        `---
"eslint-plugin-es-x": minor
---

Add \`es-x/${ruleId}\` rule
`,
    )

    cp.execSync(`code "${ruleFile}"`)
    cp.execSync(`code "${testFile}"`)
    cp.execSync(`code "${docFile}"`)

    const yellow = "\u001b[33m"

    const reset = "\u001b[0m"

    console.log(`Test Command:

${yellow}npx mocha "tests/**/${ruleId}.js" --reporter dot --timeout 60000${reset}

`)
}

/**
 * @template T
 * @param {Promise<T>} maybeCancelPromise
 * @returns {Promise<T>}
 */
async function unwrapPrompt(maybeCancelPromise) {
    const result = await maybeCancelPromise

    if (prompts.isCancel(result)) {
        prompts.cancel("✖ Operation cancelled")
        // eslint-disable-next-line no-process-exit
        process.exit(0)
    }
    return result
}

function buildGlobalObjectRuleResources({ ruleId, object }) {
    return {
        rule: `"use strict"

const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the \`${object}\` class.",
            category: "ES${maxESVersion}",
            recommended: false,
            url: "",
        },
        fixable: null,
        messages: {
            forbidden: "ES${maxESVersion} '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["${object}"])
    },
}
`,
        test: `"use strict"
        
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/${ruleId}.js")

new RuleTester().run("${ruleId}", rule, {
    valid: ["Array", "Object", "let ${object} = 0; ${object}"],
    invalid: [
        {
            code: "${object}",
            errors: ["ES${maxESVersion} '${object}' class is forbidden."],
        },
        {
            code: "function f() { ${object} }",
            errors: ["ES${maxESVersion} '${object}' class is forbidden."],
        },
    ],
})
`,
        doc: `# es-x/${ruleId}
> 

This rule reports ES${maxESVersion} [\`${object}\` class]($$LINK$$) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

\`\`\`js
/*eslint es-x/${ruleId}: error */
let ${object.toLowerCase()} = new ${object}()
\`\`\`

</eslint-playground>
`,
    }
}

function buildStaticPropertiesRuleResources({ ruleId, object, properties }) {
    const promptObject = globalThis[object]
    const exampleProperty = promptObject
        ? Object.getOwnPropertyNames(promptObject)[0]
        : "example"
    const propertyType =
        promptObject && promptObject[properties[0]]
            ? typeof promptObject[properties[0]]
            : "function"
    const kind =
        propertyType === "function"
            ? ["method", "methods"]
            : ["property", "properties"]
    const propertiesString =
        properties.length > 1 ? `{${properties.join(",")}}` : properties[0]
    let propertiesName = `\`${object}.${properties[properties.length - 1]}\` ${kind[0]}`
    if (properties.length > 1) {
        propertiesName = `${properties
            .slice(0, -1)
            .map((p) => `\`${object}.${p}\``)
            .join(
                ", ",
            )}, and \`${object}.${properties[properties.length - 1]}\` ${kind[1]}`
    }

    return {
        rule: `"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the \`${object}.${propertiesString}\` ${kind[0]}",
            category: "ES${maxESVersion}",
            recommended: false,
            url: "",
        },
        fixable: null,
        messages: {
            forbidden: "ES${maxESVersion} '{{name}}' ${kind[0]} is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return defineStaticPropertiesHandler(context, {
            "${object}": { ${properties.map((p) => `"${p}": "${propertyType}"`).join(",\n")} },
        })
    },
}
`,
        test: `"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/${ruleId}.js")

new RuleTester().run("${ruleId}", rule, {
    valid: [
        "${object}",
        "${object}.${exampleProperty}",
        ${properties.map((p) => `"let ${object} = 0; ${object}.${p}"`).join(",\n")}
    ],
    invalid: [
        ${properties
            .map(
                (p) => `{
            code: "${object}.${p}",
            errors: ["ES${maxESVersion} '${object}.${p}' ${kind[0]} is forbidden."],
        }`,
            )
            .join(",\n")}
    ],
})
`,
        doc: `# es-x/${ruleId}
> 

This rule reports ES${maxESVersion} [${propertiesName}]($$LINK$$) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

\`\`\`js
/*eslint es-x/${ruleId}: error */
${properties.map((p) => `${object}.${p}();`).join("\n")}
\`\`\`

</eslint-playground>

## 🔧 Options

This rule has an option.

\`\`\`jsonc
{
  "rules": {
    "es-x/${ruleId}": [
      "error",
      {
        "allowTestedProperty": false
      }
    ]
  }
}
\`\`\`

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the \`settings['es-x'].allowTestedProperty\` setting.
`,
    }
}

function buildNonStandardStaticPropertiesRuleResources({ ruleId, object }) {
    const camelObject = camelCase(object)
    return {
        rule: `"use strict"

const {
    defineNonstandardStaticPropertiesHandler,
} = require("../util/define-nonstandard-static-properties-handler")
const { ${camelObject}Properties } = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description: "disallow non-standard static properties on \`${object}\` class",
            category: "nonstandard",
            recommended: false,
            url: "",
        },
        fixable: null,
        messages: {
            forbidden: "Non-standard '{{name}}' property is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: { type: "string" },
                        uniqueItems: true,
                    },
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        /** @type {Set<string>} */
        const allows = new Set([
            ...(context.options[0]?.allow || []),
            ...${camelObject}Properties,
        ])
        return defineNonstandardStaticPropertiesHandler(context, {
            '${object}': allows,
        })
    },
}
`,
        test: `"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/${ruleId}.js")
const { ${camelObject}Properties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("${ruleId}", rule, {
    valid: [
        ...[...${camelObject}Properties].map((p) => \`${object}.\${p}\`),
        { code: "${object}.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "${object}.unknown()",
            errors: ["Non-standard '${object}.unknown' property is forbidden."],
        },
        {
            code: "${object}.foo",
            errors: ["Non-standard '${object}.foo' property is forbidden."],
        },
    ],
})
`,
        doc: `# es-x/${ruleId}
> 

This rule reports non-standard static properties on \`${object}\` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

\`\`\`js
/*eslint es-x/${ruleId}: error */
${object}.unknown();
\`\`\`

</eslint-playground>

## 🔧 Options

This rule has an option.

\`\`\`jsonc
{
  "rules": {
    "es-x/${ruleId}": [
      "error",
      {
        "allow": [],
        "allowTestedProperty": false
      }
    ]
  }
}
\`\`\`

### allow: string[]

An array of non-standard property names to allow.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the \`settings['es-x'].allowTestedProperty\` setting.
`,
    }
}

function buildNonStandardPrototypePropertiesRuleResources({ ruleId, object }) {
    const camelObject = camelCase(object)
    return {
        rule: `"use strict"

const {
    defineNonstandardPrototypePropertiesHandler,
} = require("../util/define-nonstandard-prototype-properties-handler")
const { ${camelObject}PrototypeProperties } = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description: "disallow non-standard properties on ${object} instance",
            category: "nonstandard",
            recommended: false,
            url: "",
        },
        fixable: null,
        messages: {
            forbidden: "Non-standard '{{name}}' property is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: { type: "string" },
                        uniqueItems: true,
                    },
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        /** @type {Set<string>} */
        const allows = new Set([
            ...(context.options[0]?.allow || []),
            ...${camelObject}PrototypeProperties,
        ])
        return defineNonstandardPrototypePropertiesHandler(context, {
            '${object}': allows,
        })
    },
}
`,
        test: `"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/${ruleId}.js")
const {
    ${camelObject}PrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "${ruleId}"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...${camelObject}PrototypeProperties].map((p) => \`(new ${object}()).\${p}\`),
        { code: "(new ${object}()).unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "(new ${object}()).unknown()",
            errors: [
                "Non-standard '${object}.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new ${object}()).foo",
            errors: [
                "Non-standard '${object}.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new ${object}())[0]",
            errors: [
                "Non-standard '${object}.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new ${object}())['01']",
            errors: [
                "Non-standard '${object}.prototype.01' property is forbidden.",
            ],
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({
    languageOptions: {
        parser,
        parserOptions: {
            tsconfigRootDir,
            project,
            disallowAutomaticSingleRunInference: true,
        },
    },
}).run(\`${ruleId} TS Full Type Information\`, rule, {
    valid: [
        { filename, code: "foo" },
        { filename, code: "foo.toString" },
        { filename, code: "foo.foo" },
        { filename, code: "let foo = {}; foo.foo" },
        ...[...${camelObject}PrototypeProperties].map((p) => ({
            filename,
            code: \`(new ${object}()).\${p}\`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "(new ${object}()).foo",
            errors: [
                "Non-standard '${object}.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new ${object}())[0]",
            errors: [
                "Non-standard '${object}.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new ${object}())['01']",
            errors: [
                "Non-standard '${object}.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = (new ${object}()); foo.foo",
            errors: [
                "Non-standard '${object}.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends ${object}>(a: T) { a.baz }",
            errors: [
                "Non-standard '${object}.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
`,
        doc: `# es-x/${ruleId}
> 

This rule reports non-standard properties on ${object} instance as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

\`\`\`js
/*eslint es-x/${ruleId}: error */
const foo = new ${object}();
foo.unknown();
\`\`\`

</eslint-playground>

## 🔧 Options

This rule has an option.

\`\`\`jsonc
{
  "rules": {
    "es-x/${ruleId}": [
      "error",
      {
        "allow": [],
        "allowTestedProperty": false
      }
    ]
  }
}
\`\`\`

### allow: string[]

An array of non-standard property names to allow.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the \`settings['es-x'].allowTestedProperty\` setting.
`,
    }
}

function buildDefaultResources({ ruleId }) {
    return {
        rule: `"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow ....",
            category: "ES${maxESVersion}",
            recommended: false,
            url: "",
        },
        fixable: null,
        messages: {
            forbidden: "",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {}
    },
}
`,
        test: `"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/${ruleId}.js")

if (!RuleTester.isSupported(${maxESVersion})) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of ${ruleId}.")
    return
}

new RuleTester().run("${ruleId}", rule, {
    valid: [],
    invalid: [],
})
`,
        doc: `# es-x/${ruleId}
> 

This rule reports ??? as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

\`\`\`js
/*eslint es-x/${ruleId}: error */

\`\`\`

</eslint-playground>
`,
    }
}

function camelCase(str) {
    const base = /[_.-]/u.test(str)
        ? str.replace(/[_.-](\w|$)/gu, (_, x) => x.toUpperCase())
        : str
    return `${base[0].toLowerCase()}${base.slice(1)}`
}
