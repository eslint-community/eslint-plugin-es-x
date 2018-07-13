# disallow optional `catch` binding (es/no-optional-catch-binding)

This rule reports ES2019 optional `catch` binding as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-optional-catch-binding: error */
try {
    f()
} catch {
    g()
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/lib/rules/no-optional-catch-binding.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.1/tests/lib/rules/no-optional-catch-binding.js)
