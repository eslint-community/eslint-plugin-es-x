---
title: "es-x/no-regexp-prototype-compile"
description: "disallow the `RegExp.prototype.compile` method"
since: "v5.1.0"
---

# es-x/no-regexp-prototype-compile
> disallow the `RegExp.prototype.compile` method

This rule reports Annex B feature `RegExp.prototype.compile` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-prototype-compile: [error, { aggressive: true }] */
foo.compile()
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-regexp-prototype-compile: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v5.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-prototype-compile.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-prototype-compile.js)
