---
title: "es-x/no-set-operation-methods"
description: "disallow methods like union and intersection of Set"
---

# es-x/no-set-operation-methods
> disallow methods like union and intersection of Set

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2025 [methods like union and intersection of Set](https://github.com/tc39/proposal-set-methods) (`Set.prototype.union`, `Set.prototype.intersection`, `Set.prototype.difference`, `Set.prototype.symmetricDifference`, `Set.prototype.isSubsetOf`, `Set.prototype.isSupersetOf`, and `Set.prototype.isDisjointFrom` methods) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-set-operation-methods: error */
const a = new Set()
const b = new Set()
a.union(b)
a.intersection(b)
a.difference(b)
a.symmetricDifference(b)
a.isSubsetOf(b)
a.isSupersetOf(b)
a.isDisjointFrom(b)
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-set-operation-methods.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-set-operation-methods.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
