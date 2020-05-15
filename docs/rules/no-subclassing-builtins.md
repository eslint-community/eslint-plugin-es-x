# disallow the subclassing of the built-in classes (es/no-subclassing-builtins)

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

<eslint-playground type="bad" code="/*eslint es/no-subclassing-builtins: error */
class MyArray extends Array {
    // ...
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/lib/rules/no-subclassing-builtins.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v3.0.1/tests/lib/rules/no-subclassing-builtins.js)
