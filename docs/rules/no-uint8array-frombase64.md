---
title: "es-x/no-uint8array-frombase64"
description: "disallow the `Uint8Array.fromBase64` method"
since: "v9.1.0"
---

# es-x/no-uint8array-frombase64
> disallow the `Uint8Array.fromBase64` method

- ✅ The following configurations enable this rule: [no-arraybuffer-base64], [no-new-in-es2026], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], [restrict-to-es2024], and [restrict-to-es2025]

This rule reports ES2026 [`Uint8Array.fromBase64` method](https://github.com/tc39/proposal-arraybuffer-base64) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-uint8array-frombase64: error */
Uint8Array.fromBase64(string)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-uint8array-frombase64": [
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

This rule was introduced in v9.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-uint8array-frombase64.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-uint8array-frombase64.js)

[no-arraybuffer-base64]: ../configs/index.md#no-arraybuffer-base64
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
