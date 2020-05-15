# disallow the `Number.parseFloat` method (es/no-number-parsefloat)

This rule reports ES2015 `Number.parseFloat` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-parsefloat: error */
const b = Number.parseFloat(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-number-parsefloat.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-number-parsefloat.js)
