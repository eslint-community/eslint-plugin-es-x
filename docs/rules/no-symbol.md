---
title: "es-x/no-symbol"
description: "disallow the `Symbol` class"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-symbol
> disallow the `Symbol` class

- ✅ The following configurations enable this rule: [no-new-in-es2015], [restrict-to-es3], and [restrict-to-es5]

This rule reports ES2015 `Symbol` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-symbol: error */
let s = Symbol("s")
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-symbol.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-symbol.js)

[no-new-in-es2015]: ../configs/index.md#no-new-in-es2015
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
