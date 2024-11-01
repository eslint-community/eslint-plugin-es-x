---
title: "es-x/no-iterator"
description: "disallow the `Iterator` class"
since: "v8.1.0"
---

# es-x/no-iterator
> disallow the `Iterator` class

- ✅ The following configurations enable this rule: [no-iterator-helpers] and [no-new-in-esnext]

This rule reports ES2025 `Iterator` class as errors.\
The `Iterator` class was added in the ES2025 [Iterator Helpers proposal](https://github.com/tc39/proposal-iterator-helpers).

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator: error */
const wrapper = Iterator.from(iter);
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v8.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator.js)

[no-iterator-helpers]: ../configs/index.md#no-iterator-helpers
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
