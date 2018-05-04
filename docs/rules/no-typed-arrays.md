# disallow ES2015 typed arrays (es/no-typed-arrays)

This rule reports ES2015 typed arrays as errors.

- `Int8Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Int16Array`
- `Uint16Array`
- `Int32Array`
- `Uint32Array`
- `Float32Array`
- `Float64Array`
- `DataView`

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let numbers = new Int32Array(10)
```
