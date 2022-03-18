---
title: "es-x/no-number-parsefloat"
description: "disallow the `Number.parseFloat` method"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-number-parsefloat
> disallow the `Number.parseFloat` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 `Number.parseFloat` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-number-parsefloat: error */
const b = Number.parseFloat(value)
" />

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-number-parsefloat.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-number-parsefloat.js)
