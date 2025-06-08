---
title: "es-x/no-trailing-dynamic-import-commas"
description: "disallow trailing commas in `import()`"
since: "v8.1.0"
---

# es-x/no-trailing-dynamic-import-commas
> disallow trailing commas in `import()`

- ✅ The following configurations enable this rule: [no-import-attributes], [no-new-in-es2025], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], and [restrict-to-es2024]
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports trailing commas in `import()` as errors.\
Trailing commas in `import()` are now allowed in ES2025 [Import Attributes proposal](https://github.com/tc39/proposal-import-attributes#dynamic-import).

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad">

```js
/*eslint es-x/no-trailing-dynamic-import-commas: error */
const m1 = await import(source, )
const m2 = await import(source, options, )
const m3 = await import(
    source,
)
const m4 = await import(
    source,
    options,
)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v8.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-trailing-dynamic-import-commas.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-trailing-dynamic-import-commas.js)

[no-import-attributes]: ../configs/index.md#no-import-attributes
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
