#  (es/no-subclassing-builtins)

This rule reports ES2015 subclassing of built-in classes as errors.

The built-in classes include the following classes (constructors):

- `Array`
- `Boolean`
- `Error`
- `RegExp`
- `Function`
- `Map`
- `Number`
- `Promise`
- `Set`
- `String`

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
class MyArray extends Array {
    // ...
}
```
