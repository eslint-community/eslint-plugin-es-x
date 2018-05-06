# disallow the `Object.values` method (es/no-object-values)

This rule reports ES2017 `Object.values` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const values = Object.values(obj)
```

## 📚 References

- [Rule source](../../lib/rules/no-object-values.js)
- [Test source](../../tests/lib/rules/no-object-values.js)
