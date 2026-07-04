---
title: "es-x/no-weakmap-prototype-getorinsert"
description: "disallow the `WeakMap.prototype.getOrInsert` method"
since: "v9.4.0"
---

# es-x/no-weakmap-prototype-getorinsert
> disallow the `WeakMap.prototype.getOrInsert` method

- ✅ The following configurations enable this rule: [no-new-in-es2026], [no-upsert], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], [restrict-to-es2024], and [restrict-to-es2025]

This rule reports ES2026 [`WeakMap.prototype.getOrInsert` method](https://github.com/tc39/proposal-upsert) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-weakmap-prototype-getorinsert: error */
const foo = new WeakMap();
foo.getOrInsert(key, value);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-weakmap-prototype-getorinsert": [
      "error",
      {
        "aggressive": false,
        "allowTestedProperty": false
      }
    ]
  }
}
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 🚀 Version

This rule was introduced in v9.4.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-weakmap-prototype-getorinsert.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-weakmap-prototype-getorinsert.ts)

[no-new-in-es2026]: ../configs/index.md#no-new-in-es2026
[no-upsert]: ../configs/index.md#no-upsert
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
