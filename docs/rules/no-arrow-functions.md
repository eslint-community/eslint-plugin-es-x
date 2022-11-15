---
title: "es-x/no-arrow-functions"
description: "disallow arrow function expressions"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-arrow-functions
> disallow arrow function expressions

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 arrow functions as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad">

```js
/*eslint es-x/no-arrow-functions: error */
let a = () => 100
let b = () => { doSomething() }
```

</eslint-playground>

👌 Examples of **correct** code for this rule:

<eslint-playground fix type="good">

```js
/*eslint es-x/no-arrow-functions: error */
let a = function() { return 100 }
let b = function() { doSomething() }
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-arrow-functions.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-arrow-functions.js)
