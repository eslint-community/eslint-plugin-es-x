---
title: "es-x/no-symbol-prototype-description"
description: "disallow the `Symbol.prototype.description` property"
since: "[eslint-plugin-es] v5.0.0"
---

# es-x/no-symbol-prototype-description
> disallow the `Symbol.prototype.description` property

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2019`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, and `plugin:es-x/restrict-to-es2018`

This rule reports ES2019 [`Symbol.prototype.description` property](https://github.com/tc39/proposal-Symbol-description) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-symbol-prototype-description: [error, { aggressive: true }] */
Symbol("foo").description
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-symbol-prototype-description: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v5.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-symbol-prototype-description.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-symbol-prototype-description.js)
