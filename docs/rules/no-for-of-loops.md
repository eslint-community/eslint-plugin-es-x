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

- [Rule source](../../lib/rules/no-for-of-loops.js)
- [Test source](../../tests/lib/rules/no-for-of-loops.js)
