---
title: "es-x/no-intl-datetimeformat-prototype-formattoparts"
description: "disallow the `DateTimeFormat.prototype.formatToParts` method"
since: "v6.0.0"
---

# es-x/no-intl-datetimeformat-prototype-formattoparts
> disallow the `DateTimeFormat.prototype.formatToParts` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2017-intl-api`, `plugin:es-x/restrict-to-es-intl-api-1st-edition`, `plugin:es-x/restrict-to-es2015-intl-api`, and `plugin:es-x/restrict-to-es2016-intl-api`

This rule reports ES2017 Intl API `DateTimeFormat.prototype.formatToParts` as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-datetimeformat-prototype-formattoparts: [error, { aggressive: true }] */
const formatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
console.log(formatter.formatToParts(num));
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yml
rules:
  es-x/no-intl-datetimeformat-prototype-formattoparts: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v6.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-datetimeformat-prototype-formattoparts.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-datetimeformat-prototype-formattoparts.js)
