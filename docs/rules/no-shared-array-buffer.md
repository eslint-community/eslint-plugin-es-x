# disallow the `SharedArrayBuffer` class (es/no-shared-array-buffer)

This rule reports ES2017 `SharedArrayBuffer` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let buffer = new SharedArrayBuffer(10)
```

## 📚 References

- [Rule source](../../lib/rules/no-shared-array-buffer.js)
- [Test source](../../tests/lib/rules/no-shared-array-buffer.js)
