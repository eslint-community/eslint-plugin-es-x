# disallow `for-of` statements (es/no-for-of-loops)

This rule reports ES2015 `for-of` statements as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
for (var a of b) {}
for (let a of b) {}
for (a of b) {}
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-for-of-loops.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-for-of-loops.js)
