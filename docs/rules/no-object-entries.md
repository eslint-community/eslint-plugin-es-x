# disallow the `Object.entries` method (es/no-object-entries)

This rule reports ES2017 `Object.entries` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-entries: error */
const entries = Object.entries(obj)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-object-entries.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-object-entries.js)
