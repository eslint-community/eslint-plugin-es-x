# disallow `Math.clz32` method (es/no-math-clz32)

This rule reports ES2015 `Math.clz32` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const n = Math.clz32(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-math-clz32.js)
- [Test source](../../tests/lib/rules/no-math-clz32.js)
