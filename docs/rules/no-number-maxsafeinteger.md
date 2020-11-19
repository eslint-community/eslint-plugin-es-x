# es/no-number-maxsafeinteger
> disallow the `Number.MAX_SAFE_INTEGER` property

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2015`, `plugin:es/restrict-to-es3`, and `plugin:es/restrict-to-es5`

This rule reports ES2015 `Number.MAX_SAFE_INTEGER` property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-maxsafeinteger: error */
const b = Number.MAX_SAFE_INTEGER
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-number-maxsafeinteger.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-number-maxsafeinteger.js)
