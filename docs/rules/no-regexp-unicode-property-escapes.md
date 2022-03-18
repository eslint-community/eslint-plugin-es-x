---
title: "es-x/no-regexp-unicode-property-escapes"
description: "disallow RegExp Unicode property escape sequences"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-regexp-unicode-property-escapes
> disallow RegExp Unicode property escape sequences

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2018`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, and `plugin:es-x/restrict-to-es2017`

This rule reports ES2018 [RegExp Unicode property escape sequences](https://github.com/tc39/proposal-regexp-unicode-property-escapes#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-regexp-unicode-property-escapes: error */
const r1 = /\p{Script=Hiragana}+/u
" />

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-unicode-property-escapes.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-unicode-property-escapes.js)
