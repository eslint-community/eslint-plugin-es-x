---
title: "es-x/no-intl-relativetimeformat"
description: "disallow the `Intl.RelativeTimeFormat` object"
since: "v6.0.0"
---

# es-x/no-intl-relativetimeformat
> disallow the `Intl.RelativeTimeFormat` object

- ✅ The following configurations enable this rule: [no-new-in-es2020-intl-api], [restrict-to-es-intl-api-1st-edition], [restrict-to-es2015-intl-api], [restrict-to-es2016-intl-api], [restrict-to-es2017-intl-api], [restrict-to-es2018-intl-api], and [restrict-to-es2019-intl-api]

This rule reports ES2020 Intl API `Intl.RelativeTimeFormat` object as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-relativetimeformat: error */
const rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v6.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-relativetimeformat.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-relativetimeformat.js)

[no-new-in-es2020-intl-api]: ../configs/index.md#no-new-in-es2020-intl-api
[restrict-to-es-intl-api-1st-edition]: ../configs/index.md#restrict-to-es-intl-api-1st-edition
[restrict-to-es2015-intl-api]: ../configs/index.md#restrict-to-es2015-intl-api
[restrict-to-es2016-intl-api]: ../configs/index.md#restrict-to-es2016-intl-api
[restrict-to-es2017-intl-api]: ../configs/index.md#restrict-to-es2017-intl-api
[restrict-to-es2018-intl-api]: ../configs/index.md#restrict-to-es2018-intl-api
[restrict-to-es2019-intl-api]: ../configs/index.md#restrict-to-es2019-intl-api
