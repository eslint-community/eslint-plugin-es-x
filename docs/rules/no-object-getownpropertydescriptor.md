# disallow the `Object.getOwnPropertyDescriptor` method (es/no-object-getownpropertydescriptor)

This rule reports ES5 `Object.getOwnPropertyDescriptor` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-getownpropertydescriptor: error */
var descriptors = Object.getOwnPropertyDescriptor(obj)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-object-getownpropertydescriptor.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-object-getownpropertydescriptor.js)
