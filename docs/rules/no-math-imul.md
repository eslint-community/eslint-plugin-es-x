# disallow the `Math.imul` method (es/no-math-imul)

This rule reports ES2015 `Math.imul` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const n = Math.imul(value)
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-math-imul.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-math-imul.js)