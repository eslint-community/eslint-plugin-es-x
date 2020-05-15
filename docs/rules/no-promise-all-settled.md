# disallow `Promise.allSettled` function (es/no-promise-all-settled)

This rule reports ES2020 [`Promise.allSettled` function](https://github.com/tc39/proposal-promise-allSettled) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-promise-all-settled: error */
const p = Promise.allSettled(promises)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-promise-all-settled.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-promise-all-settled.js)
