---
title: "es-x/no-set-prototype-union"
description: "disallow the `Set.prototype.union` method"
---

# es-x/no-set-prototype-union
> disallow the `Set.prototype.union` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext] and [no-set-methods]

This rule reports ES2025 [`Set.prototype.union`](https://github.com/tc39/proposal-set-methods) methods as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-set-prototype-union: error */
const a = new Set()
const b = new Set()
a.union(b)
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-set-prototype-union.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-set-prototype-union.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
[no-set-methods]: ../configs/index.md#no-set-methods
