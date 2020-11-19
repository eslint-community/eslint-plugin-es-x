# es/no-object-getownpropertydescriptors
> disallow the `Object.getOwnPropertyDescriptors` method

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2017`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, and `plugin:es/restrict-to-es2016`

This rule reports ES2017 `Object.getOwnPropertyDescriptors` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-getownpropertydescriptors: error */
const descriptors = Object.getOwnPropertyDescriptors(obj)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-object-getownpropertydescriptors.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-object-getownpropertydescriptors.js)
