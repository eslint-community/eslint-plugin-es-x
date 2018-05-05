# disallow the `Math.tanh` method (es/no-math-tanh)

This rule reports ES2015 `Math.tanh` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const n = Math.tanh(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-math-tanh.js)
- [Test source](../../tests/lib/rules/no-math-tanh.js)
