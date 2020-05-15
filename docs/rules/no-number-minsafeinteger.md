# disallow the `Number.MIN_SAFE_INTEGER` property (es/no-number-minsafeinteger)

This rule reports ES2015 `Number.MIN_SAFE_INTEGER` property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-minsafeinteger: error */
const b = Number.MIN_SAFE_INTEGER
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-number-minsafeinteger.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-number-minsafeinteger.js)
