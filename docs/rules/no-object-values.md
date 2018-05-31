# disallow the `Object.values` method (es/no-object-values)

This rule reports ES2017 `Object.values` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const values = Object.values(obj)
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-object-values.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-object-values.js)
