---
title: "es-x/no-regexp-duplicate-named-capturing-groups"
description: "disallow RegExp duplicate named capturing groups"
since: "v7.8.0"
---

# es-x/no-regexp-duplicate-named-capturing-groups
> disallow RegExp duplicate named capturing groups

- ✅ The following configurations enable this rule: [no-new-in-es2025], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], and [restrict-to-es2024]

This rule reports ES2025 [RegExp duplicate named capture groups](https://github.com/tc39/proposal-duplicate-named-capturing-groups) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-duplicate-named-capturing-groups: error */
const r1 = /(?<year>\d{4})-\d{2}|\d{2}-(?<year>\d{4})/
const r2 = /(?<x>a)|(?<x>b)/
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v7.8.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-duplicate-named-capturing-groups.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-duplicate-named-capturing-groups.js)

[no-new-in-es2025]: ../configs/index.md#no-new-in-es2025
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
[restrict-to-es2024]: ../configs/index.md#restrict-to-es2024
