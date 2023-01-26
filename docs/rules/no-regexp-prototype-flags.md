---
title: "es-x/no-regexp-prototype-flags"
description: "disallow the `RegExp.prototype.flags` property"
since: "[eslint-plugin-es] v5.0.0"
---

# es-x/no-regexp-prototype-flags
> disallow the `RegExp.prototype.flags` property

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 `RegExp.prototype.flags` property as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-prototype-flags: [error, { aggressive: true }] */
/foo/u.flags
new RegExp(pattern, flags).flags
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-regexp-prototype-flags: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v5.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-prototype-flags.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-prototype-flags.js)
