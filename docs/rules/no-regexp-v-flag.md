---
title: "es-x/no-regexp-v-flag"
description: "disallow RegExp `v` flag"
since: "v7.2.0"
---

# es-x/no-regexp-v-flag
> disallow RegExp `v` flag

- ✅ The following configurations enable this rule: [no-new-in-es2024], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], and [restrict-to-es2023]

This rule reports ES2024 [RegExp `v` flag](https://github.com/tc39/proposal-regexp-v-flag) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-v-flag: error */
const r1 = /^\p{RGI_Emoji}$/v
const r2 = /[\p{Decimal_Number}--[0-9]]/v
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v7.2.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-v-flag.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-v-flag.js)

[no-new-in-es2024]: ../configs/index.md#no-new-in-es2024
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
[restrict-to-es2019]: ../configs/index.md#restrict-to-es2019
[restrict-to-es2020]: ../configs/index.md#restrict-to-es2020
[restrict-to-es2021]: ../configs/index.md#restrict-to-es2021
[restrict-to-es2022]: ../configs/index.md#restrict-to-es2022
[restrict-to-es2023]: ../configs/index.md#restrict-to-es2023
