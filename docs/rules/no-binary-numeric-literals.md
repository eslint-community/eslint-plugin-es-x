# disallow binary numeric literals (es/no-binary-numeric-literals)

This rule reports ES2015 binary numeric literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-binary-numeric-literals: error */
let a = 0b1010
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-binary-numeric-literals.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-binary-numeric-literals.js)
