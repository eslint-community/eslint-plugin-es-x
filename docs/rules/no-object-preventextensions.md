# disallow the `Object.preventExtensions` method (es/no-object-preventextensions)

This rule reports ES5 `Object.preventExtensions` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-preventextensions: error */
Object.preventExtensions(obj)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-object-preventextensions.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-object-preventextensions.js)
