---
title: "es-x/no-date-prototype-togmtstring"
description: "disallow the `Date.prototype.toGMTString` method"
since: "v5.1.0"
---

# es-x/no-date-prototype-togmtstring
> disallow the `Date.prototype.toGMTString` method

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports Annex B feature `Date.prototype.toGMTString` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad">

```js
/*eslint es-x/no-date-prototype-togmtstring: [error, { aggressive: true }] */
foo.toGMTString()
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-date-prototype-togmtstring: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v5.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-date-prototype-togmtstring.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-date-prototype-togmtstring.js)
