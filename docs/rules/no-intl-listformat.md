---
title: "es-x/no-intl-listformat"
description: "disallow the `Intl.ListFormat` object"
---

# es-x/no-intl-listformat
> disallow the `Intl.ListFormat` object

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2021-intl-api`, `plugin:es-x/restrict-to-es-intl-api-1st-edition`, `plugin:es-x/restrict-to-es2015-intl-api`, `plugin:es-x/restrict-to-es2016-intl-api`, `plugin:es-x/restrict-to-es2017-intl-api`, `plugin:es-x/restrict-to-es2018-intl-api`, `plugin:es-x/restrict-to-es2019-intl-api`, and `plugin:es-x/restrict-to-es2020-intl-api`

This rule reports ES2021 Intl API `Intl.ListFormat` object as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-listformat: error */
const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-listformat.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-listformat.js)
