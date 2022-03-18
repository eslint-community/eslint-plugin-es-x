---
title: "es-x/no-generators"
description: "disallow generator function declarations"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-generators
> disallow generator function declarations

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 generator function declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-generators: error */
function* f1() {}
const f2 = function*() {}
const obj = {
    *f3() {}
}
class A {
    *f4() {}
}
" />

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-generators.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-generators.js)
