---
title: "es-x/no-intl-datetimeformat-prototype-formatrange"
description: "disallow the `Intl.DateTimeFormat.prototype.formatRange` method"
since: "v6.0.0"
---

# es-x/no-intl-datetimeformat-prototype-formatrange
> disallow the `Intl.DateTimeFormat.prototype.formatRange` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2021-intl-api`, `plugin:es-x/restrict-to-es-intl-api-1st-edition`, `plugin:es-x/restrict-to-es2015-intl-api`, `plugin:es-x/restrict-to-es2016-intl-api`, `plugin:es-x/restrict-to-es2017-intl-api`, `plugin:es-x/restrict-to-es2018-intl-api`, `plugin:es-x/restrict-to-es2019-intl-api`, and `plugin:es-x/restrict-to-es2020-intl-api`

This rule reports ES2021 Intl API `Intl.DateTimeFormat.prototype.formatRange` as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-datetimeformat-prototype-formatrange: [error, { aggressive: true }] */
const dateTimeFormat = new Intl.DateTimeFormat('en', options1);
console.log(dateTimeFormat.formatRange(startDate, endDate));
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yml
rules:
  es-x/no-intl-datetimeformat-prototype-formatrange: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v6.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-datetimeformat-prototype-formatrange.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-datetimeformat-prototype-formatrange.js)
