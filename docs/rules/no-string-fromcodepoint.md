# disallow the `String.fromCodePoint` method (es/no-string-fromcodepoint)

This rule reports ES2015 `String.fromCodePoint` as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const thumbUp = String.fromCodePoint(0x1F44D)
```

## 📚 References

- [Rule source](../../lib/rules/no-string-fromcodepoint.js)
- [Test source](../../tests/lib/rules/no-string-fromcodepoint.js)
