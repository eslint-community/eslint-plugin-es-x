---
title: "es-x/no-temporal"
description: "disallow the `Temporal` class"
---

# es-x/no-temporal
> disallow the `Temporal` class

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2026 [`Temporal` class](https://github.com/tc39/proposal-temporal) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-temporal: error */
let temporal = new Temporal()
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-temporal.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-temporal.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
