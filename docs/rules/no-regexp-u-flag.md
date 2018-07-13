# disallow RegExp `u` flag (es/no-regexp-u-flag)

This rule reports ES2015 RegExp `u` flag as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-regexp-u-flag: error */
const r1 = /[☀️☔]/u
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/lib/rules/no-regexp-u-flag.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/tests/lib/rules/no-regexp-u-flag.js)
