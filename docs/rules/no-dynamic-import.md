# disallow `import()` syntax (es/no-dynamic-import)

This rule reports ES2020 [`import()` syntax](https://github.com/tc39/proposal-dynamic-import) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-dynamic-import: error */
(async () => {
    const a = await import("source")
})()
" />
