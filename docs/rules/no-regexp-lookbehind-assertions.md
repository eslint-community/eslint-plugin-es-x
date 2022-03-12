# es-x/no-regexp-lookbehind-assertions
> disallow RegExp lookbehind assertions

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2018`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, and `plugin:es-x/restrict-to-es2017`

This rule reports ES2018 [RegExp lookbehind assertions](https://github.com/tc39/proposal-regexp-lookbehind#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-regexp-lookbehind-assertions: error */
const r1 = /(?<=a)b/
const r2 = /(?<!a)b/
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-lookbehind-assertions.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-lookbehind-assertions.js)
