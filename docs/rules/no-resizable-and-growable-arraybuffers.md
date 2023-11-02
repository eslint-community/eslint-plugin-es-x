---
title: "es-x/no-resizable-and-growable-arraybuffers"
description: "disallow resizable and growable ArrayBuffers"
since: "v7.3.0"
---

# es-x/no-resizable-and-growable-arraybuffers
> disallow resizable and growable ArrayBuffers

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-esnext`

This rule reports ES2024 [Resizable and growable ArrayBuffers](https://github.com/tc39/proposal-resizablearraybuffer) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-resizable-and-growable-arraybuffers: [error, { aggressive: true }] */
const ab = new ArrayBuffer(8, { maxByteLength: 16 });
if (sab.resizable) {
  console.log("AB is resizable!");
  sab.resize(12);
}

const sab = new SharedArrayBuffer(8, { maxByteLength: 16 });
if (sab.growable) {
  console.log("SAB is growable!");
  sab.grow(12);
}
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-resizable-and-growable-arraybuffers: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v7.3.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-resizable-and-growable-arraybuffers.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-resizable-and-growable-arraybuffers.js)
