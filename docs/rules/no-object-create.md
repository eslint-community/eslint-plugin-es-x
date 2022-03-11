# es/no-object-create
> disallow the `Object.create` method

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es5` and `plugin:es/restrict-to-es3`

This rule reports ES5 `Object.create` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-create: error */
Object.create({})
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-object-create.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-object-create.js)
