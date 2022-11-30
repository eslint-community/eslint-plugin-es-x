---
title: "es-x/no-regexp-y-flag"
description: "disallow RegExp `y` flag"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-regexp-y-flag
> disallow RegExp `y` flag

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 RegExp `y` flag as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-y-flag: error */
const r1 = /foo/y
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-y-flag.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-y-flag.js)
