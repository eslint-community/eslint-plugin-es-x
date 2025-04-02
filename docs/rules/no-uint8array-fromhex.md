---
title: "es-x/no-uint8array-fromhex"
description: "disallow the `Uint8Array.fromHex` method"
---

# es-x/no-uint8array-fromhex
> disallow the `Uint8Array.fromHex` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-arraybuffer-base64] and [no-new-in-esnext]

This rule reports ES2026 [`Uint8Array.fromHex` method](https://github.com/tc39/proposal-arraybuffer-hex) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-uint8array-fromhex: error */
Uint8Array.fromHex(string)
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-uint8array-fromhex.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-uint8array-fromhex.js)

[no-arraybuffer-base64]: ../configs/index.md#no-arraybuffer-base64
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
