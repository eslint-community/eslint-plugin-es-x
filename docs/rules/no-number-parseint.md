# disallow the `Number.parseInt` method (es/no-number-parseint)

This rule reports ES2015 `Number.parseInt` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const b = Number.parseInt(value)
```

## 📚 References

- [Rule source](../../lib/rules/no-number-parseint.js)
- [Test source](../../tests/lib/rules/no-number-parseint.js)
