# disallow RegExp `s` flag (es/no-regexp-s-flag)

This rule reports ES2018 [RegExp `s` flag](https://github.com/tc39/proposal-regexp-dotall-flag#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-regexp-s-flag: error */
const r1 = /./s
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/lib/rules/no-regexp-s-flag.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/tests/lib/rules/no-regexp-s-flag.js)
