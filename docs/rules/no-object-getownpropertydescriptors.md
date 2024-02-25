---
title: "es-x/no-object-getownpropertydescriptors"
description: "disallow the `Object.getOwnPropertyDescriptors` method"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-object-getownpropertydescriptors
> disallow the `Object.getOwnPropertyDescriptors` method

- ✅ The following configurations enable this rule: [no-new-in-es2017], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], and [restrict-to-es2016]

This rule reports ES2017 `Object.getOwnPropertyDescriptors` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-object-getownpropertydescriptors: error */
const descriptors = Object.getOwnPropertyDescriptors(obj)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-object-getownpropertydescriptors.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-getownpropertydescriptors.js)

[no-new-in-es2017]: ../configs/index.md#no-new-in-es2017
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
