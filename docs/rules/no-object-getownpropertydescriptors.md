# disallow the `Object.getOwnPropertyDescriptors` method (es/no-object-getownpropertydescriptors)

This rule reports ES2017 `Object.getOwnPropertyDescriptors` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-getownpropertydescriptors: error */
const descriptors = Object.getOwnPropertyDescriptors(obj)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-object-getownpropertydescriptors.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-object-getownpropertydescriptors.js)
