---
title: "es-x/no-trailing-commas"
description: "disallow trailing commas in array/object literals"
since: "[eslint-plugin-es] v1.1.0"
---

# es-x/no-trailing-commas
> disallow trailing commas in array/object literals

- ✅ The following configurations enable this rule: [no-new-in-es5] and [restrict-to-es3]

This rule reports ES5 trailing commas in array/object literals as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-trailing-commas: error */
var a = [1, 2,]
var b = { x: 1, y: 2, }
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.1.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-trailing-commas.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-trailing-commas.js)

[no-new-in-es5]: ../configs/index.md#no-new-in-es5
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
