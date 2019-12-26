# disallow the `Number.isFinite` method (es/no-number-isfinite)

This rule reports ES2015 `Number.isFinite` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-isfinite: error */
const b = Number.isFinite(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-number-isfinite.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-number-isfinite.js)
