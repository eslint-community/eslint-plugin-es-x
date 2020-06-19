# disallow nullish coalescing operators (es/no-nullish-coalescing-operators)

This rule reports ES2020 [Nullish Coalescing operators](https://github.com/tc39/proposal-nullish-coalescing) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-nullish-coalescing-operators: error */
var x = a ?? b
" />

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es/no-nullish-coalescing-operators: error */
var x = a || b
var x = a != null ? a : b
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-nullish-coalescing-operators.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-nullish-coalescing-operators.js)
