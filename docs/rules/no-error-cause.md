---
title: "es-x/no-error-cause"
description: "disallow Error Cause"
---

# es-x/no-error-cause
> disallow Error Cause

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

This rule reports ES2022 [Error Cause](https://github.com/tc39/proposal-error-cause).

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-error-cause: error */
throw new Error('failed', { cause: err });
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-error-cause.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-error-cause.js)
