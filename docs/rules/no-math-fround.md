# disallow the `Math.fround` method (es/no-math-fround)

This rule reports ES2015 `Math.fround` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-math-fround: error */
const n = Math.fround(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-math-fround.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-math-fround.js)
