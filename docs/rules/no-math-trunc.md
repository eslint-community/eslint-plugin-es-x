# disallow the `Math.trunc` method (es/no-math-trunc)

This rule reports ES2015 `Math.trunc` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-math-trunc: error */
const n = Math.trunc(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-math-trunc.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-math-trunc.js)
