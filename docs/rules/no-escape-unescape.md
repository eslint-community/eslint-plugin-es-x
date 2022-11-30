---
title: "es-x/no-escape-unescape"
description: "disallow `escape` and `unescape`"
since: "v5.1.0"
---

# es-x/no-escape-unescape
> disallow `escape` and `unescape`

This rule reports Annex B feature `escape` and `unescape` as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-escape-unescape: error */
escape('%&')
unescape('%25%26')
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-escape-unescape.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-escape-unescape.js)
