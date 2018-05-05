# disallow the `Number.isFinite` method (es/no-number-isfinite)

This rule reports ES2015 `Number.isFinite` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const b = Number.isFinite(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-number-isfinite.js)
- [Test source](../../tests/lib/rules/no-number-isfinite.js)
