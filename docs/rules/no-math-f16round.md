---
title: "es-x/no-math-f16round"
description: "disallow the `Math.f16round` method"
---

# es-x/no-math-f16round
> disallow the `Math.f16round` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-float16array] and [no-new-in-esnext]

This rule reports ES2025 [`Math.f16round` method](https://github.com/tc39/proposal-float16array) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-math-f16round: error */
const n = Math.f16round(value)
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-math-f16round.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-math-f16round.js)

[no-float16array]: ../configs/index.md#no-float16array
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
