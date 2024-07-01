---
title: "es-x/no-intl-numberformat-prototype-formatrangetoparts"
description: "disallow the `NumberFormat.prototype.formatRangeToParts` method"
since: "v6.0.0"
---

# es-x/no-intl-numberformat-prototype-formatrangetoparts
> disallow the `NumberFormat.prototype.formatRangeToParts` method

- ✅ The following configurations enable this rule: [no-intl-numberformat-v3], [no-new-in-es2023-intl-api], [restrict-to-es-intl-api-1st-edition], [restrict-to-es2015-intl-api], [restrict-to-es2016-intl-api], [restrict-to-es2017-intl-api], [restrict-to-es2018-intl-api], [restrict-to-es2019-intl-api], [restrict-to-es2020-intl-api], [restrict-to-es2021-intl-api], and [restrict-to-es2022-intl-api]

This rule reports ES2023 Intl API `NumberFormat.prototype.formatRangeToParts` as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-numberformat-prototype-formatrangetoparts: [error, { aggressive: true }] */
const nf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",
  currencyDisplay: "code",
  maximumFractionDigits: 0,
});
nf.formatRangeToParts(3, 5);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yml
rules:
  es-x/no-intl-numberformat-prototype-formatrangetoparts: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v6.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-numberformat-prototype-formatrangetoparts.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-numberformat-prototype-formatrangetoparts.js)

[no-intl-numberformat-v3]: ../configs/index.md#no-intl-numberformat-v3
[no-new-in-es2023-intl-api]: ../configs/index.md#no-new-in-es2023-intl-api
[restrict-to-es-intl-api-1st-edition]: ../configs/index.md#restrict-to-es-intl-api-1st-edition
[restrict-to-es2015-intl-api]: ../configs/index.md#restrict-to-es2015-intl-api
[restrict-to-es2016-intl-api]: ../configs/index.md#restrict-to-es2016-intl-api
[restrict-to-es2017-intl-api]: ../configs/index.md#restrict-to-es2017-intl-api
[restrict-to-es2018-intl-api]: ../configs/index.md#restrict-to-es2018-intl-api
[restrict-to-es2019-intl-api]: ../configs/index.md#restrict-to-es2019-intl-api
[restrict-to-es2020-intl-api]: ../configs/index.md#restrict-to-es2020-intl-api
[restrict-to-es2021-intl-api]: ../configs/index.md#restrict-to-es2021-intl-api
[restrict-to-es2022-intl-api]: ../configs/index.md#restrict-to-es2022-intl-api
