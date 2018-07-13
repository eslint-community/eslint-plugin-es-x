# disallow the `Object.assign` method (es/no-object-assign)

This rule reports ES2015 `Object.assign` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-assign: error */
const obj = Object.assign({}, x, y)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/lib/rules/no-object-assign.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/tests/lib/rules/no-object-assign.js)
