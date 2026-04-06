---
title: "es-x/no-asyncdisposablestack"
description: "disallow the `AsyncDisposableStack` class"
since: "v8.7.0"
---

# es-x/no-asyncdisposablestack
> disallow the `AsyncDisposableStack` class

- ✅ The following configurations enable this rule: [no-explicit-resource-management] and [no-new-in-esnext]

This rule reports ES2027 [`AsyncDisposableStack` class](https://github.com/tc39/proposal-explicit-resource-management) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-asyncdisposablestack: error */
let asyncdisposablestack = new AsyncDisposableStack()
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v8.7.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-asyncdisposablestack.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-asyncdisposablestack.js)

[no-explicit-resource-management]: ../configs/index.md#no-explicit-resource-management
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
