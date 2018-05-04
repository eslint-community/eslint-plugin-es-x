# disallow RegExp `y` flag (es/no-regexp-y-flag)

This rule reports ES2015 RegExp `y` flag as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /foo/y
```

## 📚 References

- [Rule source](../../lib/rules/no-regexp-y-flag.js)
- [Test source](../../tests/lib/rules/no-regexp-y-flag.js)
