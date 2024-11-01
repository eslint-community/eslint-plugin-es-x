---
title: "es-x/no-iterator-prototype-toarray"
description: "disallow the `Iterator.prototype.toArray` method"
since: "v8.1.0"
---

# es-x/no-iterator-prototype-toarray
> disallow the `Iterator.prototype.toArray` method

- ✅ The following configurations enable this rule: [no-iterator-helpers] and [no-new-in-esnext]

This rule reports ES2025 [`Iterator.prototype.toArray`](https://github.com/tc39/proposal-iterator-helpers) as errors.\

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-prototype-toarray: error */
const result = naturals()
  .toArray();

function* naturals() {
  // ...
}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v8.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-prototype-toarray.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-prototype-toarray.js)

[no-iterator-helpers]: ../configs/index.md#no-iterator-helpers
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
