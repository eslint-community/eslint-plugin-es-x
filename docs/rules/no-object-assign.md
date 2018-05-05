# disallow `Object.assign` method (es/no-object-assign)

This rule reports ES2015 `Object.assign` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const obj = Object.assign({}, x, y)
```

## 📚 References

- [Rule source](../../lib/rules/no-object-assign.js)
- [Test source](../../tests/lib/rules/no-object-assign.js)
