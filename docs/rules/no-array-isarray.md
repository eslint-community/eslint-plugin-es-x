---
title: "es-x/no-array-isarray"
description: "disallow the `Array.isArray` method"
since: "[eslint-plugin-es] v3.0.0"
---

# es-x/no-array-isarray
> disallow the `Array.isArray` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 `Array.isArray` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-array-isarray: error */
var array = Array.isArray(obj)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v3.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-array-isarray.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-array-isarray.js)
