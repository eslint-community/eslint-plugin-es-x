# disallow the `String.raw` method (es/no-string-raw)

This rule reports ES2015 `String.raw` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-string-raw: error */
const pattern = String.raw`[\w_$]+`
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-string-raw.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-string-raw.js)
