# disallow RegExp `u` flag (es/no-regexp-u-flag)

This rule reports ES2015 RegExp `u` flag as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const r1 = /[☀️☔]/u
```
