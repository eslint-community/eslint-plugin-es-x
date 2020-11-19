# es/no-subclassing-builtins
> disallow the subclassing of the built-in classes

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2015`, `plugin:es/restrict-to-es3`, and `plugin:es/restrict-to-es5`

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

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-subclassing-builtins.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-subclassing-builtins.js)
