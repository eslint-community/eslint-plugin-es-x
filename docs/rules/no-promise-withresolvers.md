---
title: "es-x/no-promise-withresolvers"
description: "disallow the `Promise.withResolvers()` method"
---

# es-x/no-promise-withresolvers
> disallow the `Promise.withResolvers()` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-esnext`

This rule reports ES2024 [`Promise.withResolvers` function](https://github.com/tc39/proposal-promise-with-resolvers) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-promise-withresolvers: error */
const { promise, resolve, reject } = Promise.withResolvers()
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-promise-withresolvers.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-promise-withresolvers.js)
