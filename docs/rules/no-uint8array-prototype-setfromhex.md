---
title: "es-x/no-uint8array-prototype-setfromhex"
description: "disallow the `Uint8Array.prototype.setFromHex` method"
---

# es-x/no-uint8array-prototype-setfromhex
> disallow the `Uint8Array.prototype.setFromHex` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-arraybuffer-base64] and [no-new-in-esnext]

This rule reports ES2026 [`Uint8Array.prototype.setFromHex` method](https://github.com/tc39/proposal-arraybuffer-base64) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-uint8array-prototype-setfromhex: error */
const arr = new Uint8Array(8);
const { read, written } = target.setFromHex('Zm9vYmFy')
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-uint8array-prototype-setfromhex": [
      "error",
      {
        "aggressive": false,
        "allowTestedProperty": false
      }
    ]
  }
}
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-uint8array-prototype-setfromhex.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-uint8array-prototype-setfromhex.js)

[no-arraybuffer-base64]: ../configs/index.md#no-arraybuffer-base64
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
