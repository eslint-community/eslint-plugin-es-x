---
title: "es-x/no-float16array"
description: "disallow the `Float16Array` class"
---

# es-x/no-float16array
> disallow the `Float16Array` class

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-float16array] and [no-new-in-esnext]

This rule reports ES2025 [`Float16Array` class](https://github.com/tc39/proposal-float16array) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-float16array: error */
const float16 = new Float16Array(2);
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-float16array.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-float16array.js)

[no-float16array]: ../configs/index.md#no-float16array
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
