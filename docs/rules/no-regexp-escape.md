---
title: "es-x/no-regexp-escape"
description: "disallow `RegExp.escape` function"
---

# es-x/no-regexp-escape
> disallow `RegExp.escape` function

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2025 [`RegExp.escape`](https://github.com/tc39/proposal-regex-escaping) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-escape: error */
RegExp.escape(s)
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-escape.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-escape.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
