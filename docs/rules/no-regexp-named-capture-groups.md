# es-x/no-regexp-named-capture-groups
> disallow RegExp named capture groups

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2018`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, and `plugin:es-x/restrict-to-es2017`

This rule reports ES2018 [RegExp named capture groups](https://github.com/tc39/proposal-regexp-named-groups#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-regexp-named-capture-groups: error */
const r1 = /(?&lt;a&gt;b)c/
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-named-capture-groups.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-named-capture-groups.js)
