# disallow RegExp lookbehind assertions (es/no-regexp-lookbehind-assertions)

This rule reports ES2018 [RegExp lookbehind assertions](https://github.com/tc39/proposal-regexp-lookbehind#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /(?<=a)b/
const r2 = /(?<!a)b/
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-regexp-lookbehind-assertions.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-regexp-lookbehind-assertions.js)
