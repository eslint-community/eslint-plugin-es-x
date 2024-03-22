---
title: "es-x/no-regexp-s-flag"
description: "disallow RegExp `s` flag"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-regexp-s-flag
> disallow RegExp `s` flag

- ✅ The following configurations enable this rule: [no-new-in-es2018], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], and [restrict-to-es2017]

This rule reports ES2018 [RegExp `s` flag](https://github.com/tc39/proposal-regexp-dotall-flag#readme) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-s-flag: error */
const r1 = /./s
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-s-flag.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-s-flag.js)

[no-new-in-es2018]: ../configs/index.md#no-new-in-es2018
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
