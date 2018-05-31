# disallow RegExp `u` flag (es/no-regexp-u-flag)

This rule reports ES2015 RegExp `u` flag as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /[☀️☔]/u
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-regexp-u-flag.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-regexp-u-flag.js)
