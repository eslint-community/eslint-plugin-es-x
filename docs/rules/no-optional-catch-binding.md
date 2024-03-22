---
title: "es-x/no-optional-catch-binding"
description: "disallow optional `catch` binding"
since: "[eslint-plugin-es] v1.3.0"
---

# es-x/no-optional-catch-binding
> disallow optional `catch` binding

- ✅ The following configurations enable this rule: [no-new-in-es2019], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], and [restrict-to-es2018]

This rule reports ES2019 optional `catch` binding as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-optional-catch-binding: error */
try {
    f()
} catch {
    g()
}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.3.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-optional-catch-binding.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-optional-catch-binding.js)

[no-new-in-es2019]: ../configs/index.md#no-new-in-es2019
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
