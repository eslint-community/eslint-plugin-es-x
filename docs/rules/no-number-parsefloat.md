# disallow the `Number.parseFloat` method (es/no-number-parsefloat)

This rule reports ES2015 `Number.parseFloat` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-parsefloat: error */
const b = Number.parseFloat(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.0/lib/rules/no-number-parsefloat.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.0/tests/lib/rules/no-number-parsefloat.js)
