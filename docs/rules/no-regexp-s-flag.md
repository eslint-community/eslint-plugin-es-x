# disallow RegExp `s` flag (es/no-regexp-s-flag)

This rule reports ES2018 [RegExp `s` flag](https://github.com/tc39/proposal-regexp-dotall-flag#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /./s
```
