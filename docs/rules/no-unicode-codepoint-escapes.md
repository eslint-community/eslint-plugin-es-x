---
title: "es-x/no-unicode-codepoint-escapes"
description: "disallow Unicode code point escape sequences"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-unicode-codepoint-escapes
> disallow Unicode code point escape sequences

- ✅ The following configurations enable this rule: [no-new-in-es2015], [restrict-to-es3], and [restrict-to-es5]
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 Unicode code point escape sequences as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad">

```js
/*eslint es-x/no-unicode-codepoint-escapes: error */
const a\u{31} = `foo`
const a2 = "a\u{62}b"
```

</eslint-playground>

👌 Examples of **correct** code for this rule:

<eslint-playground fix type="good">

```js
/*eslint es-x/no-unicode-codepoint-escapes: error */
const a\u0031 = `foo`
const a2 = "a\u0062b"
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-unicode-codepoint-escapes.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-unicode-codepoint-escapes.js)

[no-new-in-es2015]: ../configs/index.md#no-new-in-es2015
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
