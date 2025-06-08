---
title: "es-x/no-dataview-prototype-getfloat16-setfloat16"
description: "disallow the `DataView.prototype.{getFloat16,setFloat16}` methods"
since: "v8.5.0"
---

# es-x/no-dataview-prototype-getfloat16-setfloat16
> disallow the `DataView.prototype.{getFloat16,setFloat16}` methods

- ✅ The following configurations enable this rule: [no-float16array], [no-new-in-es2025], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], and [restrict-to-es2024]

This rule reports ES2025 [`DataView.prototype.{getFloat16,setFloat16}` methods](https://github.com/tc39/proposal-float16array) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-dataview-prototype-getfloat16-setfloat16: error */
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setFloat16(1, Math.PI);

console.log(view.getFloat16(1));
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-dataview-prototype-getfloat16-setfloat16": [
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

This rule was introduced in v8.5.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-dataview-prototype-getfloat16-setfloat16.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-dataview-prototype-getfloat16-setfloat16.js)

[no-float16array]: ../configs/index.md#no-float16array
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
