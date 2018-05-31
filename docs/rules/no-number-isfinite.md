# disallow the `Number.isFinite` method (es/no-number-isfinite)

This rule reports ES2015 `Number.isFinite` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const b = Number.isFinite(value)
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-number-isfinite.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-number-isfinite.js)
