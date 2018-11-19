# disallow the `Math.tanh` method (es/no-math-tanh)

This rule reports ES2015 `Math.tanh` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-math-tanh: error */
const n = Math.tanh(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.0/lib/rules/no-math-tanh.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.0/tests/lib/rules/no-math-tanh.js)
