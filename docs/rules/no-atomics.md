---
title: "es-x/no-atomics"
description: "disallow the `Atomics` class"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-atomics
> disallow the `Atomics` class

- ✅ The following configurations enable this rule: [no-new-in-es2017], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], and [restrict-to-es2016]

This rule reports ES2017 `Atomics` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-atomics: error */
Atomics.add(buffer, 0, 2)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-atomics.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-atomics.js)

[no-new-in-es2017]: ../configs/index.md#no-new-in-es2017
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
