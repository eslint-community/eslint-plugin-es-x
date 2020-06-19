# disallow the `Object.fromEntries` method (es/no-object-fromentries)

This rule reports ES2019 `Object.fromEntries` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-object-fromentries: error */
const obj = Object.fromEntries(map)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/lib/rules/no-object-fromentries.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.0/tests/lib/rules/no-object-fromentries.js)
