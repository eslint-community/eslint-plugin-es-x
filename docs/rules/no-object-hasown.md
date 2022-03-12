# es/no-object-hasown
> disallow the `Object.hasOwn` method

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-esnext`

This rule reports ES2022 `Object.hasOwn` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-hasown: error */
const hasFoo = Object.hasOwn(obj, 'foo')
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-object-hasown.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-object-hasown.js)
