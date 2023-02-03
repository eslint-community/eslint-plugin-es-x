---
title: "es-x/no-intl-displaynames"
description: "disallow the `Intl.DisplayNames` object"
---

# es-x/no-intl-displaynames
> disallow the `Intl.DisplayNames` object

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2021-intl-api`, `plugin:es-x/restrict-to-es-intl-api-1st-edition`, `plugin:es-x/restrict-to-es2015-intl-api`, `plugin:es-x/restrict-to-es2016-intl-api`, `plugin:es-x/restrict-to-es2017-intl-api`, `plugin:es-x/restrict-to-es2018-intl-api`, `plugin:es-x/restrict-to-es2019-intl-api`, and `plugin:es-x/restrict-to-es2020-intl-api`

This rule reports ES2021 Intl API `Intl.DisplayNames` object as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-displaynames: error */
const dn = new Intl.DisplayNames('en', {type: 'calendar'});
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-displaynames.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-displaynames.js)
