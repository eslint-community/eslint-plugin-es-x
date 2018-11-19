# disallow the `Math.log1p` method (es/no-math-log1p)

This rule reports ES2015 `Math.log1p` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-math-log1p: error */
const n = Math.log1p(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.0/lib/rules/no-math-log1p.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.0/tests/lib/rules/no-math-log1p.js)
