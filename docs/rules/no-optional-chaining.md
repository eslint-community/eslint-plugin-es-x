# disallow optional chaining (es/no-optional-chaining)

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

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-optional-chaining.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-optional-chaining.js)
