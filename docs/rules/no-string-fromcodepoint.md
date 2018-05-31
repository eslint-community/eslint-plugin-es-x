# disallow the `String.fromCodePoint` method (es/no-string-fromcodepoint)

This rule reports ES2015 `String.fromCodePoint` as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const thumbUp = String.fromCodePoint(0x1F44D)
```

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-string-fromcodepoint.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-string-fromcodepoint.js)
