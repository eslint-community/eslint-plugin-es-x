# disallow block-scoped variable declarations (es/no-block-scoped-variables)

This rule reports ES2015 block-scoped variable declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-block-scoped-variables: error */
let a = 1
const b = 2
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-block-scoped-variables.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-block-scoped-variables.js)
