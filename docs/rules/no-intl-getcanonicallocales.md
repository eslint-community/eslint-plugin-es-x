---
title: "es-x/no-intl-getcanonicallocales"
description: "disallow the `Intl.getCanonicalLocales` method"
since: "v6.0.0"
---

# es-x/no-intl-getcanonicallocales
> disallow the `Intl.getCanonicalLocales` method

- ✅ The following configurations enable this rule: [no-new-in-es2016-intl-api], [restrict-to-es-intl-api-1st-edition], and [restrict-to-es2015-intl-api]

This rule reports ES2016 Intl API `Intl.getCanonicalLocales` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-getcanonicallocales: error */
console.log(Intl.getCanonicalLocales('EN-US'));
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v6.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-getcanonicallocales.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-getcanonicallocales.js)

[no-new-in-es2016-intl-api]: ../configs/index.md#no-new-in-es2016-intl-api
[restrict-to-es-intl-api-1st-edition]: ../configs/index.md#restrict-to-es-intl-api-1st-edition
[restrict-to-es2015-intl-api]: ../configs/index.md#restrict-to-es2015-intl-api
