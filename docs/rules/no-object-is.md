# disallow `Object.is` method (es/no-object-is)

This rule reports ES2015 `Object.is` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const negZero = Object.is(value, -0)
```

## 📚 References

- [Rule source](../../lib/rules/no-object-is.js)
- [Test source](../../tests/lib/rules/no-object-is.js)
