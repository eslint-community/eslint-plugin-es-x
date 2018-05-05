# disallow `Array.from` method (es/no-array-from)

This rule reports ES2015 `Array.from` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const array = Array.from("hello")
```

## 📚 References

- [Rule source](../../lib/rules/no-array-from.js)
- [Test source](../../tests/lib/rules/no-array-from.js)
