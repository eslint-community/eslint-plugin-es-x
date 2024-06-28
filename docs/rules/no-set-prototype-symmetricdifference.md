---
title: "es-x/no-set-prototype-symmetricdifference"
description: "disallow the `Set.prototype.symmetricDifference` method"
since: "v7.7.0"
---

# es-x/no-set-prototype-symmetricdifference
> disallow the `Set.prototype.symmetricDifference` method

- ✅ The following configurations enable this rule: [no-new-in-esnext] and [no-set-methods]

This rule reports ES2025 [`Set.prototype.symmetricDifference`](https://github.com/tc39/proposal-set-methods) methods as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-set-prototype-symmetricdifference: error */
const a = new Set()
const b = new Set()
a.symmetricDifference(b)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v7.7.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-set-prototype-symmetricdifference.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-set-prototype-symmetricdifference.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
[no-set-methods]: ../configs/index.md#no-set-methods
