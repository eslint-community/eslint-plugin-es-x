# disallow the `Number.isInteger` method (es/no-number-isinteger)

This rule reports ES2015 `Number.isInteger` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-isinteger: error */
const b = Number.isInteger(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.0/lib/rules/no-number-isinteger.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.0/tests/lib/rules/no-number-isinteger.js)
