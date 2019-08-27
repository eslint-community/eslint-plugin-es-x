# disallow the `Math.cbrt` method (es/no-math-cbrt)

This rule reports ES2015 `Math.cbrt` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-math-cbrt: error */
const n = Math.cbrt(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.1/lib/rules/no-math-cbrt.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.1/tests/lib/rules/no-math-cbrt.js)
