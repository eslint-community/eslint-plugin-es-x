---
title: "es-x/no-intl-getcanonicallocales"
description: "disallow the `Intl.getCanonicalLocales` method"
---

# es-x/no-intl-getcanonicallocales
> disallow the `Intl.getCanonicalLocales` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2016-intl-api`, `plugin:es-x/restrict-to-es-intl-api-1st-edition`, and `plugin:es-x/restrict-to-es2015-intl-api`

This rule reports ES2016 Intl API `Intl.getCanonicalLocales` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-getcanonicallocales: error */
console.log(Intl.getCanonicalLocales('EN-US'));
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-getcanonicallocales.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-getcanonicallocales.js)
