# disallow Unicode code point escape sequences (es/no-unicode-codepoint-escapes)

This rule reports ES2015 Unicode code point escape sequences as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const a\u{31} = `foo`
const a2 = "a\u{62}b"
```
