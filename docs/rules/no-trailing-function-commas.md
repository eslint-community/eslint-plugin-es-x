---
title: "es-x/no-trailing-function-commas"
description: "disallow trailing commas in parameter/argument lists"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-trailing-function-commas
> disallow trailing commas in parameter/argument lists

- ✅ The following configurations enable this rule: [no-new-in-es2017], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], and [restrict-to-es2016]
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2017 [trailing commas in parameter/argument lists](https://github.com/tc39/proposal-trailing-function-commas#readme) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad">

```js
/*eslint es-x/no-trailing-function-commas: error */
async function f1(a,) {}
let f2 = async function(a,) {}
let f3 = async (a,) => {}
let obj = { async f4(a,) {} }
class A { async f5(a,) {} }

foo(a,)
new F(a,)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-trailing-function-commas.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-trailing-function-commas.js)

[no-new-in-es2017]: ../configs/index.md#no-new-in-es2017
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
