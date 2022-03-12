# es-x/no-object-defineproperty
> disallow the `Object.defineProperty` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 `Object.defineProperty` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-object-defineproperty: error */
Object.defineProperty(obj, &quot;prop&quot;, {})
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/lib/rules/no-object-defineproperty.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/tests/lib/rules/no-object-defineproperty.js)
