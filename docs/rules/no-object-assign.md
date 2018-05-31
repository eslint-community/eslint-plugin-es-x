# disallow the `Object.assign` method (es/no-object-assign)

This rule reports ES2015 `Object.assign` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const obj = Object.assign({}, x, y)
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-object-assign.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-object-assign.js)
