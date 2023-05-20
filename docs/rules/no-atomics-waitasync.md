---
title: "es-x/no-atomics-waitasync"
description: "disallow the `Atomics.waitAsync` method"
---

# es-x/no-atomics-waitasync
> disallow the `Atomics.waitAsync` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-esnext`

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-atomics-waitasync: [error, { aggressive: true }] */
Atomics.waitAsync(i32a, 0, 0, 1000)
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-atomics-waitasync.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-atomics-waitasync.js)
