# disallow `Math.fround` method (es/no-math-fround)

This rule reports ES2015 `Math.fround` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const n = Math.fround(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-math-fround.js)
- [Test source](../../tests/lib/rules/no-math-fround.js)
