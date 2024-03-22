---
title: "es-x/no-template-literals"
description: "disallow template literals"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-template-literals
> disallow template literals

- ✅ The following configurations enable this rule: [no-new-in-es2015], [restrict-to-es3], and [restrict-to-es5]
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 template literals as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad">

```js
/*eslint es-x/no-template-literals: error */
const a1 = `foo`
const a2 = `foo${bar}baz`
const a3 = tag`foo`
```

</eslint-playground>

👌 Examples of **correct** code for this rule:

<eslint-playground fix type="good">

```js
/*eslint es-x/no-template-literals: error */
const a1 = "foo"
const a2 = "foo"+bar+"baz"
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-template-literals.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-template-literals.js)

[no-new-in-es2015]: ../configs/index.md#no-new-in-es2015
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
