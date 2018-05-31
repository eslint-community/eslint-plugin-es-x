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

- [Rule source](../../lib/rules/no-optional-catch-binding.js)
- [Test source](../../tests/lib/rules/no-optional-catch-binding.js)
