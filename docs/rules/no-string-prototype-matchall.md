---
title: "es-x/no-string-prototype-matchall"
description: "disallow the `String.prototype.matchAll` method"
since: "[eslint-plugin-es] v5.0.0"
---

# es-x/no-string-prototype-matchall
> disallow the `String.prototype.matchAll` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2020`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, and `plugin:es-x/restrict-to-es2019`

This rule reports ES2020 [`String.prototype.matchAll` method](https://github.com/tc39/proposal-string-matchall) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-string-prototype-matchall: [error, { aggressive: true }] */
foo.matchAll("a")
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-string-prototype-matchall: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v5.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-string-prototype-matchall.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-string-prototype-matchall.js)
