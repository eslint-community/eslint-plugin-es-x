# disallow the `Math.sign` method (es/no-math-sign)

This rule reports ES2015 `Math.sign` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-math-sign: error */
const n = Math.sign(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/lib/rules/no-math-sign.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/tests/lib/rules/no-math-sign.js)
