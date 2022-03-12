# es-x/no-object-values
> disallow the `Object.values` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2017`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, and `plugin:es-x/restrict-to-es2016`

This rule reports ES2017 `Object.values` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-object-values: error */
const values = Object.values(obj)
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-object-values.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-values.js)
