---
title: "es-x/no-map"
description: "disallow the `Map` class"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-map
> disallow the `Map` class

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 `Map` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-map: error */
let map = new Map()
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-map.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-map.js)
