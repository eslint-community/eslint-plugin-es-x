# es-x/no-object-entries
> disallow the `Object.entries` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2017`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, and `plugin:es-x/restrict-to-es2016`

This rule reports ES2017 `Object.entries` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-object-entries: error */
const entries = Object.entries(obj)
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/lib/rules/no-object-entries.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/tests/lib/rules/no-object-entries.js)
