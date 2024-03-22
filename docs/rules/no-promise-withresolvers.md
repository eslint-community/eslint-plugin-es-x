---
title: "es-x/no-promise-withresolvers"
description: "disallow the `Promise.withResolvers()` method"
since: "v7.5.0"
---

# es-x/no-promise-withresolvers
> disallow the `Promise.withResolvers()` method

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2024 [`Promise.withResolvers` function](https://github.com/tc39/proposal-promise-with-resolvers) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-promise-withresolvers: error */
const { promise, resolve, reject } = Promise.withResolvers()
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v7.5.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-promise-withresolvers.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-promise-withresolvers.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
