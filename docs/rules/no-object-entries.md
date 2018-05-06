# disallow the `Object.entries` method (es/no-object-entries)

This rule reports ES2017 `Object.entries` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const entries = Object.entries(obj)
```

## 📚 References

- [Rule source](../../lib/rules/no-object-entries.js)
- [Test source](../../tests/lib/rules/no-object-entries.js)
