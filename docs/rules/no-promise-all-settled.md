# disallow `Promise.allSettled` function (es/no-promise-all-settled)

This rule reports ES2020 [`Promise.allSettled` function](https://github.com/tc39/proposal-promise-allSettled) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-promise-all-settled: error */
const p = Promise.allSettled(promises)
" />
