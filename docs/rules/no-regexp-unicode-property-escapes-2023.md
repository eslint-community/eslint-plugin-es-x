---
title: "es-x/no-regexp-unicode-property-escapes-2023"
description: "disallow the new values of RegExp Unicode property escape sequences in ES2023"
since: "v6.1.0"
---

# es-x/no-regexp-unicode-property-escapes-2023
> disallow the new values of RegExp Unicode property escape sequences in ES2023

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2023`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, `plugin:es-x/restrict-to-es2021`, and `plugin:es-x/restrict-to-es2022`

This rule reports the new values of ES2018 [RegExp Unicode property escape sequences](https://github.com/tc39/proposal-regexp-unicode-property-escapes#readme) which were added in ES2023.

For example, the following patterns are valid in ES2023, but syntax error in ES2022 environments:

- `\p{Script=Kawi}`
- `\p{Script=Nag_Mundari}`
- `\p{Script=Nagm}`

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-unicode-property-escapes-2023: error */
const r1 = /\p{Script=Kawi}/u
const r2 = /\p{Script=Nag_Mundari}/u
const r3 = /\p{Script=Nagm}/u
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v6.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-unicode-property-escapes-2023.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-unicode-property-escapes-2023.js)
