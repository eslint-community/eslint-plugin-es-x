# disallow the `Math.expm1` method (es/no-math-expm1)

This rule reports ES2015 `Math.expm1` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-math-expm1: error */
const n = Math.expm1(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.1/lib/rules/no-math-expm1.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.1/tests/lib/rules/no-math-expm1.js)
