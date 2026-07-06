---
title: "es-x/no-subclassing-builtins"
description: "disallow the subclassing of the built-in classes"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-subclassing-builtins
> disallow the subclassing of the built-in classes

- ✅ The following configurations enable this rule: [no-new-in-es2015], [restrict-to-es3], and [restrict-to-es5]

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

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-subclassing-builtins: error */
class MyArray extends Array {
    // ...
}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-subclassing-builtins.ts)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-subclassing-builtins.ts)

[no-new-in-es2015]: ../configs/index.md#no-new-in-es2015
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
