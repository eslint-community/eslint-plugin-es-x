# disallow RegExp Unicode property escape sequences (es/no-regexp-unicode-property-escapes)

This rule reports ES2018 [RegExp Unicode property escape sequences](https://github.com/tc39/proposal-regexp-unicode-property-escapes#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /\p{Script=Hiragana}+/u
```
