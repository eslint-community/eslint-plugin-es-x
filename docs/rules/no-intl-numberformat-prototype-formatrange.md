---
title: "es-x/no-intl-numberformat-prototype-formatrange"
description: "disallow the `NumberFormat.prototype.formatRange` method"
---

# es-x/no-intl-numberformat-prototype-formatrange
> disallow the `NumberFormat.prototype.formatRange` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-esnext-intl-api`

This rule reports ES2023 Intl API `NumberFormat.prototype.formatRange` as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-numberformat-prototype-formatrange: [error, { aggressive: true }] */
const nf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
console.log(nf.formatRange(2.9, 3.1));
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yml
rules:
  es-x/no-intl-numberformat-prototype-formatrange: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-numberformat-prototype-formatrange.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-numberformat-prototype-formatrange.js)
