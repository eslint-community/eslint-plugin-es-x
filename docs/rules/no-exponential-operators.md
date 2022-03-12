# es-x/no-exponential-operators
> disallow exponential operators

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2016`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, and `plugin:es-x/restrict-to-es2015`

This rule reports ES2016 [exponential operators](https://github.com/rwaldron/exponentiation-operator#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-exponential-operators: error */
let a = b ** 2
a **= b
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/lib/rules/no-exponential-operators.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/tests/lib/rules/no-exponential-operators.js)
