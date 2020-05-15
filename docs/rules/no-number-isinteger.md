# disallow the `Number.isInteger` method (es/no-number-isinteger)

This rule reports ES2015 `Number.isInteger` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-isinteger: error */
const b = Number.isInteger(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-number-isinteger.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-number-isinteger.js)
