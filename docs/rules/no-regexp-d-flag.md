# es/no-regexp-d-flag
> disallow RegExp `d` flag

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-esnext`

This rule reports ES2022 [RegExp `d` flag](https://github.com/tc39/proposal-regexp-match-indices#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-regexp-d-flag: error */
const r1 = /./d
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-regexp-d-flag.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-regexp-d-flag.js)
