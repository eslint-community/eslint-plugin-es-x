# disallow optional `catch` binding (es/no-optional-catch-binding)

This rule reports ES2019 optional `catch` binding as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
try {
    f()
} catch {
    g()
}
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-optional-catch-binding.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-optional-catch-binding.js)
