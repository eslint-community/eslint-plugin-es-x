# disallow the `Array.from` method (es/no-array-from)

This rule reports ES2015 `Array.from` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-array-from: error */
const array = Array.from(&quot;hello&quot;)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/lib/rules/no-array-from.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/tests/lib/rules/no-array-from.js)
