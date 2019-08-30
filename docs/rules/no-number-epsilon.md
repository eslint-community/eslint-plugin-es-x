# disallow the `Number.EPSILON` property (es/no-number-epsilon)

This rule reports ES2015 `Number.EPSILON` property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-epsilon: error */
const b = Number.EPSILON
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v2.0.0/lib/rules/no-number-epsilon.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v2.0.0/tests/lib/rules/no-number-epsilon.js)
