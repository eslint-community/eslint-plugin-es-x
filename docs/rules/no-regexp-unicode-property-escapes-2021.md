---
title: "es-x/no-regexp-unicode-property-escapes-2021"
description: "disallow the new values of RegExp Unicode property escape sequences in ES2021"
since: "v6.0.0"
---

# es-x/no-regexp-unicode-property-escapes-2021
> disallow the new values of RegExp Unicode property escape sequences in ES2021

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2021`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, and `plugin:es-x/restrict-to-es2020`

This rule reports the new values of ES2018 [RegExp Unicode property escape sequences](https://github.com/tc39/proposal-regexp-unicode-property-escapes#readme) which were added in ES2021.

For example, the following patterns are valid in ES2021, but syntax error in ES2020 environments:

- `\p{EBase}`
- `\p{EComp}`
- `\p{EMod}`
- `\p{EPres}`
- `\p{ExtPict}`
- `\p{Script=Chorasmian}`
- `\p{Script=Chrs}`
- `\p{Script=Diak}`
- `\p{Script=Dives_Akuru}`
- `\p{Script=Khitan_Small_Script}`
- `\p{Script=Kits}`
- `\p{Script=Yezi}`
- `\p{Script=Yezidi}`

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-unicode-property-escapes-2021: error */
const r1 = /\p{EBase}/u
const r2 = /\p{Script=Chorasmian}/u
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v6.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-unicode-property-escapes-2021.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-unicode-property-escapes-2021.js)
