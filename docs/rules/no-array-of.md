# disallow the `Array.of` method (es/no-array-of)

This rule reports ES2015 `Array.of` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const array = Array.of(1, 2, 3)
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-array-of.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-array-of.js)
