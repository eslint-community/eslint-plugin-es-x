---
title: "es-x/no-shared-array-buffer"
description: "disallow the `SharedArrayBuffer` class"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-shared-array-buffer
> disallow the `SharedArrayBuffer` class

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2017`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, and `plugin:es-x/restrict-to-es2016`

This rule reports ES2017 `SharedArrayBuffer` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-shared-array-buffer: error */
let buffer = new SharedArrayBuffer(10)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-shared-array-buffer.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-shared-array-buffer.js)
