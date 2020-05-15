# disallow RegExp named capture groups (es/no-regexp-named-capture-groups)

This rule reports ES2018 [RegExp named capture groups](https://github.com/tc39/proposal-regexp-named-groups#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-regexp-named-capture-groups: error */
const r1 = /(?&lt;a&gt;b)c/
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-regexp-named-capture-groups.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-regexp-named-capture-groups.js)
