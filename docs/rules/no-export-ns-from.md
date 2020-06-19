# disallow `export * as ns` (es/no-export-ns-from)

This rule reports ES2020 [`export * as ns`](https://github.com/tc39/proposal-export-ns-from) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-export-ns-from: error */
export * as ns from &quot;mod&quot;
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-export-ns-from.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-export-ns-from.js)
