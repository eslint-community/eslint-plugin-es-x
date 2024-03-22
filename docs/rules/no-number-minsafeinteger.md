---
title: "es-x/no-number-minsafeinteger"
description: "disallow the `Number.MIN_SAFE_INTEGER` property"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-number-minsafeinteger
> disallow the `Number.MIN_SAFE_INTEGER` property

- ✅ The following configurations enable this rule: [no-new-in-es2015], [restrict-to-es3], and [restrict-to-es5]

This rule reports ES2015 `Number.MIN_SAFE_INTEGER` property as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-number-minsafeinteger: error */
const b = Number.MIN_SAFE_INTEGER
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-number-minsafeinteger.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-number-minsafeinteger.js)

[no-new-in-es2015]: ../configs/index.md#no-new-in-es2015
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
