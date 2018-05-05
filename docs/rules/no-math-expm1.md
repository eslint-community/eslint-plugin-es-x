# disallow `Math.expm1` method (es/no-math-expm1)

This rule reports ES2015 `Math.expm1` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const n = Math.expm1(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-math-expm1.js)
- [Test source](../../tests/lib/rules/no-math-expm1.js)
