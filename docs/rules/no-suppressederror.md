---
title: "es-x/no-suppressederror"
description: "disallow the `SuppressedError` class"
---

# es-x/no-suppressederror
> disallow the `SuppressedError` class

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-explicit-resource-management] and [no-new-in-esnext]

This rule reports ES2026 [`SuppressedError` class](https://github.com/tc39/proposal-explicit-resource-management) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-suppressederror: error */
let suppressederror = new SuppressedError()
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-suppressederror.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-suppressederror.js)

[no-explicit-resource-management]: ../configs/index.md#no-explicit-resource-management
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
