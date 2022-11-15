---
title: "es-x/no-object-issealed"
description: "disallow the `Object.isSealed` method"
since: "[eslint-plugin-es] v3.0.0"
---

# es-x/no-object-issealed
> disallow the `Object.isSealed` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 `Object.isSealed` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-object-issealed: error */
var sealed = Object.isSealed(obj)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v3.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-object-issealed.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-issealed.js)
