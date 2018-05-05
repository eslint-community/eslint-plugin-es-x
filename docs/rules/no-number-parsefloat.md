# disallow `Number.parseFloat` method (es/no-number-parsefloat)

This rule reports ES2015 `Number.parseFloat` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const b = Number.parseFloat(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-number-parsefloat.js)
- [Test source](../../tests/lib/rules/no-number-parsefloat.js)
