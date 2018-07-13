# disallow the `Number.parseInt` method (es/no-number-parseint)

This rule reports ES2015 `Number.parseInt` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-number-parseint: error */
const b = Number.parseInt(value)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/lib/rules/no-number-parseint.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/tests/lib/rules/no-number-parseint.js)
