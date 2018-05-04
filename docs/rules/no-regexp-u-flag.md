# disallow RegExp `u` flag (es/no-regexp-u-flag)

This rule reports ES2015 RegExp `u` flag as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /[☀️☔]/u
```

## 📚 References

- [Rule source](../../lib/rules/no-regexp-u-flag.js)
- [Test source](../../tests/lib/rules/no-regexp-u-flag.js)
