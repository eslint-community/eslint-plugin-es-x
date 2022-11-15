---
title: "es-x/no-exponential-operators"
description: "disallow exponential operators"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-exponential-operators
> disallow exponential operators

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2016`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, and `plugin:es-x/restrict-to-es2015`

This rule reports ES2016 [exponential operators](https://github.com/rwaldron/exponentiation-operator#readme) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-exponential-operators: error */
let a = b ** 2
a **= b
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-exponential-operators.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-exponential-operators.js)
