---
title: "es-x/no-bigint"
description: "disallow `bigint` syntax and built-ins"
since: "[eslint-plugin-es] v2.0.0"
---

# es-x/no-bigint
> disallow `bigint` syntax and built-ins

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2020`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, and `plugin:es-x/restrict-to-es2019`

This rule reports ES2020 [BigInt](https://github.com/tc39/proposal-bigint) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-bigint: error */
let a = 100n
let b = BigInt(100)
let c = new BigInt64Array(10)
let d = new BigUint64Array(10)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v2.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-bigint.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-bigint.js)
