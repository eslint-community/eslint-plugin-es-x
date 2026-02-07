---
title: "es-x/no-symbol-asyncdispose"
description: "disallow the `Symbol.asyncDispose` property"
since: "v9.0.0"
---

# es-x/no-symbol-asyncdispose
> disallow the `Symbol.asyncDispose` property

- ✅ The following configurations enable this rule: [no-explicit-resource-management], [no-new-in-es2026], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], [restrict-to-es2024], and [restrict-to-es2025]

This rule reports ES2026 [`Symbol.asyncDispose` property](https://github.com/tc39/proposal-explicit-resource-management) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-symbol-asyncdispose: error */
x[Symbol.asyncDispose];
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-symbol-asyncdispose": [
      "error",
      {
        "allowTestedProperty": false
      }
    ]
  }
}
```

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 🚀 Version

This rule was introduced in v9.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-symbol-asyncdispose.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-symbol-asyncdispose.js)

[no-explicit-resource-management]: ../configs/index.md#no-explicit-resource-management
[no-new-in-es2026]: ../configs/index.md#no-new-in-es2026
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
[restrict-to-es2025]: ../configs/index.md#restrict-to-es2025
