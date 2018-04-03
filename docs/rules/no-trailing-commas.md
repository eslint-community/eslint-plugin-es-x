# disallow trailing commas in array/object literals (es/no-trailing-commas)

This rule reports ES5 trailing commas in array/object literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
var a = [1, 2,]
var b = { x: 1, y: 2, }
```
