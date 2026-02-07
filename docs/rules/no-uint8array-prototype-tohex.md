---
title: "es-x/no-uint8array-prototype-tohex"
description: "disallow the `Uint8Array.prototype.toHex` method"
since: "v9.1.0"
---

# es-x/no-uint8array-prototype-tohex
> disallow the `Uint8Array.prototype.toHex` method

- ✅ The following configurations enable this rule: [no-arraybuffer-base64] and [no-new-in-esnext]

This rule reports ES2026 [`Uint8Array.prototype.toHex` method](https://github.com/tc39/proposal-arraybuffer-base64) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-uint8array-prototype-tohex: error */
const arr = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
console.log(arr.toHex());
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-uint8array-prototype-tohex": [
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

## 🚀 Version

This rule was introduced in v9.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-uint8array-prototype-tohex.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-uint8array-prototype-tohex.js)

[no-arraybuffer-base64]: ../configs/index.md#no-arraybuffer-base64
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
