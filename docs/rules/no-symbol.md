# disallow the `Symbol` class (es/no-symbol)

This rule reports ES2015 `Symbol` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-symbol: error */
let s = Symbol(&quot;s&quot;)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-symbol.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-symbol.js)
