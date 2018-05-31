# disallow the `Array.from` method (es/no-array-from)

This rule reports ES2015 `Array.from` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const array = Array.from("hello")
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-array-from.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-array-from.js)
