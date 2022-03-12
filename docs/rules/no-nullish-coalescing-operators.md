# es-x/no-nullish-coalescing-operators
> disallow nullish coalescing operators

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2020`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, and `plugin:es-x/restrict-to-es2019`

This rule reports ES2020 [Nullish Coalescing operators](https://github.com/tc39/proposal-nullish-coalescing) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-nullish-coalescing-operators: error */
var x = a ?? b
" />

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es-x/no-nullish-coalescing-operators: error */
var x = a || b
var x = a != null ? a : b
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/lib/rules/no-nullish-coalescing-operators.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/tests/lib/rules/no-nullish-coalescing-operators.js)
