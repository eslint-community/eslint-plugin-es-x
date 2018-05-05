# disallow `Number.isNaN` method (es/no-number-isnan)

This rule reports ES2015 `Number.isNaN` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const b = Number.isNaN(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-number-isnan.js)
- [Test source](../../tests/lib/rules/no-number-isnan.js)
