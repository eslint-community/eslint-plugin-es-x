---
title: "es-x/no-set-prototype-issupersetof"
description: "disallow the `Set.prototype.isSupersetOf` method"
since: "v7.7.0"
---

# es-x/no-set-prototype-issupersetof
> disallow the `Set.prototype.isSupersetOf` method

- ✅ The following configurations enable this rule: [no-new-in-esnext] and [no-set-methods]

This rule reports ES2025 [`Set.prototype.isSupersetOf`](https://github.com/tc39/proposal-set-methods) methods as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-set-prototype-issupersetof: error */
const a = new Set()
const b = new Set()
a.isSupersetOf(b)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-set-prototype-issupersetof: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v7.7.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-set-prototype-issupersetof.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-set-prototype-issupersetof.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
[no-set-methods]: ../configs/index.md#no-set-methods
