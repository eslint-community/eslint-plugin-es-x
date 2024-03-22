---
title: "es-x/no-import-meta"
description: "disallow `import.meta` meta property"
since: "[eslint-plugin-es] v4.0.0"
---

# es-x/no-import-meta
> disallow `import.meta` meta property

- ✅ The following configurations enable this rule: [no-new-in-es2020], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], and [restrict-to-es2019]

This rule reports ES2020 [import.meta](https://github.com/tc39/proposal-import-meta) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-import-meta: error */
import.meta
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v4.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-import-meta.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-import-meta.js)

[no-new-in-es2020]: ../configs/index.md#no-new-in-es2020
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
[restrict-to-es2019]: ../configs/index.md#restrict-to-es2019
