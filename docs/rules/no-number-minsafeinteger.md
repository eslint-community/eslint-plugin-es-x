# es/no-number-minsafeinteger
> disallow the `Number.MIN_SAFE_INTEGER` property

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2015`, `plugin:es/restrict-to-es3`, and `plugin:es/restrict-to-es5`

This rule reports ES2015 `Number.MIN_SAFE_INTEGER` property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-minsafeinteger: error */
const b = Number.MIN_SAFE_INTEGER
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-number-minsafeinteger.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-number-minsafeinteger.js)
