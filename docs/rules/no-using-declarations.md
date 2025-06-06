---
title: "es-x/no-using-declarations"
description: "disallow `using` and `await using` declarations"
---

# es-x/no-using-declarations
> disallow `using` and `await using` declarations

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-explicit-resource-management] and [no-new-in-esnext]

This rule reports ES2026 [`using` and `await using` declarations](https://github.com/tc39/proposal-explicit-resource-management) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-using-declarations: error */

// async disposal
async function * g() {
  using stream = acquireStream(); // block-scoped critical resource
  // ...
} // cleanup

{
  await using obj = g(); // block-scoped declaration
  const r = await obj.next();
} // calls finally blocks in `g`
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-using-declarations.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-using-declarations.js)

[no-explicit-resource-management]: ../configs/index.md#no-explicit-resource-management
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
