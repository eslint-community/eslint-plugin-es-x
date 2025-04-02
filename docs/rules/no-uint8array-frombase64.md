---
title: "es-x/no-uint8array-frombase64"
description: "disallow the `Uint8Array.fromBase64` method"
---

# es-x/no-uint8array-frombase64
> disallow the `Uint8Array.fromBase64` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-arraybuffer-base64] and [no-new-in-esnext]

This rule reports ES2026 [`Uint8Array.fromBase64` method](https://github.com/tc39/proposal-arraybuffer-base64) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-uint8array-frombase64: error */
Uint8Array.fromBase64(string)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-uint8array-frombase64": [
      "error",
      {
        "allowTestedProperty": false
      }
    ]
  }
}
```

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-uint8array-frombase64.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-uint8array-frombase64.js)

[no-arraybuffer-base64]: ../configs/index.md#no-arraybuffer-base64
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
