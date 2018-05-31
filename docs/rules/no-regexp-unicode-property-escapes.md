# disallow RegExp Unicode property escape sequences (es/no-regexp-unicode-property-escapes)

This rule reports ES2018 [RegExp Unicode property escape sequences](https://github.com/tc39/proposal-regexp-unicode-property-escapes#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /\p{Script=Hiragana}+/u
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-regexp-unicode-property-escapes.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-regexp-unicode-property-escapes.js)
