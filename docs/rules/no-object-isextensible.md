# disallow the `Object.isExtensible` method (es/no-object-isextensible)

This rule reports ES5 `Object.isExtensible` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-isextensible: error */
var extensible = Object.isExtensible(obj)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-object-isextensible.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-object-isextensible.js)
