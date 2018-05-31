# disallow RegExp named capture groups (es/no-regexp-named-capture-groups)

This rule reports ES2018 [RegExp named capture groups](https://github.com/tc39/proposal-regexp-named-groups#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /(?<a>b)c/
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-regexp-named-capture-groups.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-regexp-named-capture-groups.js)
