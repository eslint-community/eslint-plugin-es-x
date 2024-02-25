---
title: "es-x/no-regexp-v-flag"
description: "disallow RegExp `v` flag"
since: "v7.2.0"
---

# es-x/no-regexp-v-flag
> disallow RegExp `v` flag

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2024 [RegExp `v` flag](https://github.com/tc39/proposal-regexp-v-flag) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-v-flag: error */
const r1 = /^\p{RGI_Emoji}$/v
const r2 = /[\p{Decimal_Number}--[0-9]]/v
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v7.2.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-v-flag.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-v-flag.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
