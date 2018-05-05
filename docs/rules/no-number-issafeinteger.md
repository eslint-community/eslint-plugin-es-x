# disallow the `Number.isSafeInteger` method (es/no-number-issafeinteger)

This rule reports ES2015 `Number.isSafeInteger` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const b = Number.isSafeInteger(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-number-issafeinteger.js)
- [Test source](../../tests/lib/rules/no-number-issafeinteger.js)
