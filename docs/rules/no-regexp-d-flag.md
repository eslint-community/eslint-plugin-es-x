---
title: "es-x/no-regexp-d-flag"
description: "disallow RegExp `d` flag"
since: "v5.0.0"
---

# es-x/no-regexp-d-flag
> disallow RegExp `d` flag

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2022`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, and `plugin:es-x/restrict-to-es2021`

This rule reports ES2022 [RegExp `d` flag](https://github.com/tc39/proposal-regexp-match-indices#readme) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-d-flag: error */
const r1 = /./d
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-d-flag.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-d-flag.js)
