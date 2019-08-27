# disallow octal numeric literals (es/no-octal-numeric-literals)

This rule reports ES2015 octal numeric literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-octal-numeric-literals: error */
let a = 0o123
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.1/lib/rules/no-octal-numeric-literals.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.4.1/tests/lib/rules/no-octal-numeric-literals.js)
