# disallow the `JSON` class (es/no-json)

This rule reports ES5 `JSON` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-json: error */
var obj = JSON.parse(text)
var str = JSON.stringify(data)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-json.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-json.js)
