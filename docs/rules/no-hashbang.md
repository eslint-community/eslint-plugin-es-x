---
title: "es-x/no-hashbang"
description: "disallow Hashbang comments"
since: "v5.3.0"
---

# es-x/no-hashbang
> disallow Hashbang comments

- ✅ The following configurations enable this rule: [no-new-in-es2023], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], and [restrict-to-es2022]

This rule reports ES2023 [Hashbang comment](https://github.com/tc39/proposal-hashbang) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
#!/usr/bin/env node
/*eslint es-x/no-hashbang: error */
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.3.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-hashbang.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-hashbang.js)

[no-new-in-es2023]: ../configs/index.md#no-new-in-es2023
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
