# disallow `Promise.any` function (es/no-promise-any)

This rule reports ES2021 [`Promise.any` function](https://github.com/tc39/proposal-promise-any) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-promise-any: error */
const p = Promise.any(promises)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-promise-any.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-promise-any.js)
