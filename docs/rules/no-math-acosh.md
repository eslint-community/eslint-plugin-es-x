# disallow the `Math.acosh` method (es/no-math-acosh)

This rule reports ES2015 `Math.acosh` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-math-acosh: error */
const n = Math.acosh(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-math-acosh.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-math-acosh.js)
