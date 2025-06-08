---
title: "es-x/no-json-modules"
description: "disallow JSON Modules"
since: "v8.1.0"
---

# es-x/no-json-modules
> disallow JSON Modules

- ✅ The following configurations enable this rule: [no-new-in-es2025], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], and [restrict-to-es2024]

This rule reports ES2025 [JSON Modules](https://github.com/tc39/proposal-json-modules) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-json-modules: error */
import json from "./foo.json" with { type: "json" };
import("foo.json", { with: { type: "json" } });
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v8.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-json-modules.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-json-modules.js)

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
