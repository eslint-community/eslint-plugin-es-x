---
title: "es-x/no-property-shorthands"
description: "disallow property shorthands"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-property-shorthands
> disallow property shorthands

- ✅ The following configurations enable this rule: [no-new-in-es2015], [restrict-to-es3], and [restrict-to-es5]
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 property shorthands as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad">

```js
/*eslint es-x/no-property-shorthands: error */
let obj = {
    a,
    b() {}
}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-property-shorthands.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-property-shorthands.js)

[no-new-in-es2015]: ../configs/index.md#no-new-in-es2015
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
