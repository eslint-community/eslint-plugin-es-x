---
title: "es-x/no-iterator-prototype-map"
description: "disallow the `Iterator.prototype.map` method"
---

# es-x/no-iterator-prototype-map
> disallow the `Iterator.prototype.map` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-iterator-helpers] and [no-new-in-esnext]

This rule reports ES2025 [`Iterator.prototype.map`](https://github.com/tc39/proposal-iterator-helpers) as errors.\

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-prototype-map: error */
const result = naturals()
  .map(n => n % 2);

function* naturals() {
  // ...
}
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-prototype-map.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-prototype-map.js)

[no-iterator-helpers]: ../configs/index.md#no-iterator-helpers
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
