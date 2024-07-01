---
title: "es-x/no-string-prototype-iswellformed"
description: "disallow the `String.prototype.isWellFormed` methods"
since: "v8.0.0"
---

# es-x/no-string-prototype-iswellformed
> disallow the `String.prototype.isWellFormed` methods

- ✅ The following configurations enable this rule: [no-is-usv-string], [no-new-in-es2024], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], and [restrict-to-es2023]

This rule reports ES2024 [`String.prototype.isWellFormed` methods](https://github.com/tc39/proposal-is-usv-string) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-string-prototype-iswellformed: [error, { aggressive: true }] */
"str".isWellFormed()
```

</eslint-playground>a

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-string-prototype-iswellformed: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v8.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-string-prototype-iswellformed.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-string-prototype-iswellformed.js)

[no-is-usv-string]: ../configs/index.md#no-is-usv-string
[no-new-in-es2024]: ../configs/index.md#no-new-in-es2024
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
