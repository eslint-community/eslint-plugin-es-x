---
title: "es-x/no-for-of-loops"
description: "disallow `for-of` statements"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-for-of-loops
> disallow `for-of` statements

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 `for-of` statements as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-for-of-loops: error */
for (var a of b) {}
for (let a of b) {}
for (a of b) {}
" />

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-for-of-loops.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-for-of-loops.js)
