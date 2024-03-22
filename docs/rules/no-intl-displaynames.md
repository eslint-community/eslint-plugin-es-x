---
title: "es-x/no-intl-displaynames"
description: "disallow the `Intl.DisplayNames` object"
since: "v6.0.0"
---

# es-x/no-intl-displaynames
> disallow the `Intl.DisplayNames` object

- ✅ The following configurations enable this rule: [no-new-in-es2021-intl-api], [restrict-to-es-intl-api-1st-edition], [restrict-to-es2015-intl-api], [restrict-to-es2016-intl-api], [restrict-to-es2017-intl-api], [restrict-to-es2018-intl-api], [restrict-to-es2019-intl-api], and [restrict-to-es2020-intl-api]

This rule reports ES2021 Intl API `Intl.DisplayNames` object as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-displaynames: error */
const dn = new Intl.DisplayNames('en', {type: 'calendar'});
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v6.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-displaynames.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-displaynames.js)

[no-new-in-es2021-intl-api]: ../configs/index.md#no-new-in-es2021-intl-api
[restrict-to-es-intl-api-1st-edition]: ../configs/index.md#restrict-to-es-intl-api-1st-edition
[restrict-to-es2015-intl-api]: ../configs/index.md#restrict-to-es2015-intl-api
[restrict-to-es2016-intl-api]: ../configs/index.md#restrict-to-es2016-intl-api
[restrict-to-es2017-intl-api]: ../configs/index.md#restrict-to-es2017-intl-api
[restrict-to-es2018-intl-api]: ../configs/index.md#restrict-to-es2018-intl-api
[restrict-to-es2019-intl-api]: ../configs/index.md#restrict-to-es2019-intl-api
[restrict-to-es2020-intl-api]: ../configs/index.md#restrict-to-es2020-intl-api
