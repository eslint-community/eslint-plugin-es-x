# es-x/no-accessor-properties
> disallow accessor properties

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 accessor properties as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-accessor-properties: error */
var a = {
    get a() {},
    set a(value) {}
}
class A {
    get a() {}
    set a(value) {}
}
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/lib/rules/no-accessor-properties.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/tests/lib/rules/no-accessor-properties.js)
