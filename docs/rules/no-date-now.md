# disallow the `Date.now` method (es/no-date-now)

This rule reports ES5 `Date.now` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-date-now: error */
var now = Date.now()
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-date-now.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-date-now.js)
