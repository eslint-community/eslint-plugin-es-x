# es/no-regexp-lookbehind-assertions
> disallow RegExp lookbehind assertions

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2018`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, and `plugin:es/restrict-to-es2017`

This rule reports ES2018 [RegExp lookbehind assertions](https://github.com/tc39/proposal-regexp-lookbehind#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-regexp-lookbehind-assertions: error */
const r1 = /(?<=a)b/
const r2 = /(?<!a)b/
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-regexp-lookbehind-assertions.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-regexp-lookbehind-assertions.js)
