# disallow the `Array.of` method (es/no-array-of)

This rule reports ES2015 `Array.of` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const array = Array.of(1, 2, 3)
```

## 📚 References

- [Rule source](../../lib/rules/no-array-of.js)
- [Test source](../../tests/lib/rules/no-array-of.js)
