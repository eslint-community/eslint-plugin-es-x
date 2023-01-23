---
title: "es-x/no-date-prototype-getyear-setyear"
description: "disallow the `Date.prototype.{getYear,setYear}` methods"
since: "v5.1.0"
---

# es-x/no-date-prototype-getyear-setyear
> disallow the `Date.prototype.{getYear,setYear}` methods

This rule reports Annex B feature `Date.prototype.{getYear,setYear}` methods as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-date-prototype-getyear-setyear: [error, { aggressive: true }] */
foo.getYear()
foo.setYear(99)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-date-prototype-getyear-setyear: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v5.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-date-prototype-getyear-setyear.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-date-prototype-getyear-setyear.js)
