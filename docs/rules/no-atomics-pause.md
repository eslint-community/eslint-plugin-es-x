---
title: "es-x/no-atomics-pause"
description: "disallow the `Atomics.pause` method"
---

# es-x/no-atomics-pause
> disallow the `Atomics.pause` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2026 [`Atomics.pause` method](https://github.com/tc39/proposal-atomics-microwait) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-atomics-pause: [error] */
Atomics.pause()
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-atomics-pause.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-atomics-pause.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
