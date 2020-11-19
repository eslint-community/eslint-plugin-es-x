# es/no-optional-chaining
> disallow optional chaining

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2020`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, `plugin:es/restrict-to-es2017`, `plugin:es/restrict-to-es2018`, and `plugin:es/restrict-to-es2019`

This rule reports ES2020 [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-optional-chaining: error */
var x = a?.b
var x = a?.[b]
foo?.()
" />

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es/no-optional-chaining: error */
var x = a != null ? a.b : undefined
var x = a && a.b
var x = a != null ? a[b] : undefined
var x = a && a[b]
foo && foo()
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-optional-chaining.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-optional-chaining.js)
