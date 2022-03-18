---
title: "es-x/no-object-defineproperties"
description: "disallow the `Object.defineProperties` method"
since: "[eslint-plugin-es] v3.0.0"
---

# es-x/no-object-defineproperties
> disallow the `Object.defineProperties` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 `Object.defineProperties` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-object-defineproperties: error */
Object.defineProperties(obj, {})
" />

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v3.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-object-defineproperties.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-defineproperties.js)
