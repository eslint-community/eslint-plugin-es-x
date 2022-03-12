# es-x/no-object-getownpropertynames
> disallow the `Object.getOwnPropertyNames` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 `Object.getOwnPropertyNames` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-object-getownpropertynames: error */
Object.getOwnPropertyNames(obj, &quot;prop&quot;, {})
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-object-getownpropertynames.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-getownpropertynames.js)
