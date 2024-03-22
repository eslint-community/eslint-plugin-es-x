---
title: "es-x/no-keyword-properties"
description: "disallow reserved words as property names"
since: "[eslint-plugin-es] v1.1.0"
---

# es-x/no-keyword-properties
> disallow reserved words as property names

- ✅ The following configurations enable this rule: [no-new-in-es5] and [restrict-to-es3]

This rule reports ES5 reserved words as property names as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-keyword-properties: error */
var a = { if: 1, class: 2 }
a.if = 2
a.class = 3
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.1.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-keyword-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-keyword-properties.js)

[no-new-in-es5]: ../configs/index.md#no-new-in-es5
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
