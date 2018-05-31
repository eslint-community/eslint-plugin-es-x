# disallow the `Number.isNaN` method (es/no-number-isnan)

This rule reports ES2015 `Number.isNaN` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const b = Number.isNaN(value)
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-number-isnan.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-number-isnan.js)
