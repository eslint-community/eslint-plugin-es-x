---
title: "es-x/no-async-functions"
description: "disallow async function declarations"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-async-functions
> disallow async function declarations

- ✅ The following configurations enable this rule: [no-new-in-es2017], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], and [restrict-to-es2016]

This rule reports ES2017 [async functions](https://github.com/tc39/ecmascript-asyncawait) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-async-functions: error */
async function f1() {}
let f2 = async function() {}
let f3 = async () => {}
let obj = { async f4() {} }
class A { async f5() {} }
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-async-functions.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-async-functions.js)

[no-new-in-es2017]: ../configs/index.md#no-new-in-es2017
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
