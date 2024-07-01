---
title: "es-x/no-object-groupby"
description: "disallow the `Object.groupBy()` method"
since: "v8.0.0"
---

# es-x/no-object-groupby
> disallow the `Object.groupBy()` method

- ✅ The following configurations enable this rule: [no-array-grouping], [no-new-in-es2024], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], and [restrict-to-es2023]

This rule reports ES2024 [`Object.groupBy()`](https://github.com/tc39/proposal-array-grouping) method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-object-groupby: error */
Object.groupBy(array, (num, index) => {
  return num % 2 === 0 ? 'even': 'odd';
});
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v8.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-object-groupby.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-groupby.js)

[no-array-grouping]: ../configs/index.md#no-array-grouping
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
