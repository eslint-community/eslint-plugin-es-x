# disallow the `Number.isInteger` method (es/no-number-isinteger)

This rule reports ES2015 `Number.isInteger` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const b = Number.isInteger(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-number-isinteger.js)
- [Test source](../../tests/lib/rules/no-number-isinteger.js)
