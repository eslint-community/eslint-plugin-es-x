# disallow `Math.log1p` method (es/no-math-log1p)

This rule reports ES2015 `Math.log1p` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const n = Math.log1p(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-math-log1p.js)
- [Test source](../../tests/lib/rules/no-math-log1p.js)
