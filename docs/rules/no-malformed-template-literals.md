---
title: "es-x/no-malformed-template-literals"
description: "disallow template literals with invalid escape sequences"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-malformed-template-literals
> disallow template literals with invalid escape sequences

- ✅ The following configurations enable this rule: [no-new-in-es2018], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], and [restrict-to-es2017]

This rule reports ES2018 [template literals with invalid escape sequences](https://github.com/tc39/proposal-template-literal-revision#readme) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-malformed-template-literals: error */
tag`\unicode`
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-malformed-template-literals.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-malformed-template-literals.js)

[no-new-in-es2018]: ../configs/index.md#no-new-in-es2018
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
