# disallow the `Symbol` class (es/no-symbol)

This rule reports ES2015 `Symbol` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-symbol: error */
let s = Symbol(&quot;s&quot;)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-symbol.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-symbol.js)
