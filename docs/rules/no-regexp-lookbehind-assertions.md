# disallow RegExp lookbehind assertions (es/no-regexp-lookbehind-assertions)

This rule reports ES2018 [RegExp lookbehind assertions](https://github.com/tc39/proposal-regexp-lookbehind#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /(?<=a)b/
const r2 = /(?<!a)b/
```

## 📚 References

- [Rule source](../../lib/rules/no-regexp-lookbehind-assertions.js)
- [Test source](../../tests/lib/rules/no-regexp-lookbehind-assertions.js)
