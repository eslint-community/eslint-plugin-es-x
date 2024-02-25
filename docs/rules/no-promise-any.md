---
title: "es-x/no-promise-any"
description: "disallow `Promise.any` function and `AggregateError` class"
since: "[eslint-plugin-es] v4.0.0"
---

# es-x/no-promise-any
> disallow `Promise.any` function and `AggregateError` class

- ✅ The following configurations enable this rule: [no-new-in-es2021], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], and [restrict-to-es2020]

This rule reports ES2021 [`Promise.any`](https://github.com/tc39/proposal-promise-any) as errors.
This proposal includes the following two:

- `Promise.any` function
- `AggregateError` class

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-promise-any: error */
const p = Promise.any(promises).catch(error => {
    if (error instanceof AggregateError) {
        // Do something.
    }
})
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v4.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-promise-any.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-promise-any.js)

[no-new-in-es2021]: ../configs/index.md#no-new-in-es2021
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
[restrict-to-es2019]: ../configs/index.md#restrict-to-es2019
[restrict-to-es2020]: ../configs/index.md#restrict-to-es2020
