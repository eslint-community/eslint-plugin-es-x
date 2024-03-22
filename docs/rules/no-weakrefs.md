---
title: "es-x/no-weakrefs"
description: "disallow the `WeakRef` and `FinalizationRegistry` class"
since: "[eslint-plugin-es] v4.0.0"
---

# es-x/no-weakrefs
> disallow the `WeakRef` and `FinalizationRegistry` class

- ✅ The following configurations enable this rule: [no-new-in-es2021], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], and [restrict-to-es2020]

This rule reports ES2021 [WeakRefs](https://github.com/tc39/proposal-weakrefs) as errors.
This proposal includes the following two:

- `WeakRef` class
- `FinalizationRegistry` class

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-weakrefs: error */
let ref = new WeakRef()
let finalizationGroup = new FinalizationRegistry(() => {})
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v4.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-weakrefs.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-weakrefs.js)

[no-new-in-es2021]: ../configs/index.md#no-new-in-es2021
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
[restrict-to-es2019]: ../configs/index.md#restrict-to-es2019
[restrict-to-es2020]: ../configs/index.md#restrict-to-es2020
