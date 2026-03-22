---
title: "es-x/no-temporal"
description: "disallow the `Temporal` global object"
since: "v9.6.0"
---

# es-x/no-temporal
> disallow the `Temporal` global object

- ✅ The following configurations enable this rule: [no-new-in-esnext] and [no-temporal]

This rule reports ES2026 [`Temporal` global object](https://github.com/tc39/proposal-temporal) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-temporal: error */
let instant = Temporal.Now.instant();
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v9.6.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-temporal.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-temporal.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
[no-temporal]: ../configs/index.md#no-temporal
