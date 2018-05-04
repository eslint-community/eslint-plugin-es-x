#  (es/no-math-methods-2015)

This rule reports ES2015 `Math` methods as errors.

- `Math.clz32`
- `Math.imul`
- `Math.sign`
- `Math.log10`
- `Math.log2`
- `Math.log1p`
- `Math.expm1`
- `Math.cosh`
- `Math.sinh`
- `Math.tanh`
- `Math.acosh`
- `Math.asinh`
- `Math.atanh`
- `Math.trunc`
- `Math.fround`
- `Math.cbrt`
- `Math.hypot`

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let sign = Math.sign(value)
```
