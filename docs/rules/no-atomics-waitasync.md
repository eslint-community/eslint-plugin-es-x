---
title: "es-x/no-atomics-waitasync"
description: "disallow the `Atomics.waitAsync` method"
since: "v7.1.0"
---

# es-x/no-atomics-waitasync
> disallow the `Atomics.waitAsync` method

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2024 [`Atomics.waitAsync` method](https://github.com/tc39/proposal-atomics-wait-async) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-atomics-waitasync: [error, { aggressive: true }] */
Atomics.waitAsync(i32a, 0, 0, 1000)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v7.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-atomics-waitasync.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-atomics-waitasync.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
