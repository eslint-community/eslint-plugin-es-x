---
title: "es-x/no-spread-elements"
description: "disallow spread elements"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-spread-elements
> disallow spread elements

- ✅ The following configurations enable this rule: [no-new-in-es2015], [restrict-to-es3], and [restrict-to-es5]

This rule reports ES2015 spread elements as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-spread-elements: error */
const a1 = [1, 2, ...array]
foo(...a, ...b)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-spread-elements.ts)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-spread-elements.ts)

[no-new-in-es2015]: ../configs/index.md#no-new-in-es2015
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
