---
title: "es-x/no-iterator"
description: "disallow the `Iterator` class"
since: "v8.1.0"
---

# es-x/no-iterator
> disallow the `Iterator` class

- ✅ The following configurations enable this rule: [no-iterator-helpers], [no-new-in-es2025], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], and [restrict-to-es2024]

This rule reports ES2025 `Iterator` class as errors.\
The `Iterator` class was added in the ES2025 [Iterator Helpers proposal](https://github.com/tc39/proposal-iterator-helpers).

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator: error */
const wrapper = Iterator.from(iter);
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v8.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator.js)

[no-iterator-helpers]: ../configs/index.md#no-iterator-helpers
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
