# es/no-object-getownpropertydescriptor
> disallow the `Object.getOwnPropertyDescriptor` method

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es5` and `plugin:es/restrict-to-es3`

This rule reports ES5 `Object.getOwnPropertyDescriptor` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-getownpropertydescriptor: error */
var descriptors = Object.getOwnPropertyDescriptor(obj)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-object-getownpropertydescriptor.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-object-getownpropertydescriptor.js)
