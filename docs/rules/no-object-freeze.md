# es-x/no-object-freeze
> disallow the `Object.freeze` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 `Object.freeze` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-object-freeze: error */
Object.freeze(obj)
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/lib/rules/no-object-freeze.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/tests/lib/rules/no-object-freeze.js)
