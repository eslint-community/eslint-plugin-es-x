---
title: "es-x/no-intl-pluralrules"
description: "disallow the `Intl.PluralRules` object"
---

# es-x/no-intl-pluralrules
> disallow the `Intl.PluralRules` object

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2018-intl-api`, `plugin:es-x/restrict-to-es-intl-api-1st-edition`, `plugin:es-x/restrict-to-es2015-intl-api`, `plugin:es-x/restrict-to-es2016-intl-api`, and `plugin:es-x/restrict-to-es2017-intl-api`

This rule reports ES2018 Intl API `Intl.PluralRules` object as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-pluralrules: error */
const pr = new Intl.PluralRules();
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-pluralrules.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-pluralrules.js)
