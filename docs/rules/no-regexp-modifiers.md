---
title: "es-x/no-regexp-modifiers"
description: "disallow RegExp Modifiers"
---

# es-x/no-regexp-modifiers
> disallow RegExp Modifiers

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2025 [RegExp Modifiers](https://github.com/tc39/proposal-regexp-modifiers) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-modifiers: error */
const re1 = /^[a-z](?-i:[a-z])$/i;
const re2 = /^(?i:[a-z])[a-z]$/;
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-modifiers.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-modifiers.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
