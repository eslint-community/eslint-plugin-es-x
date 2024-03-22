---
title: "es-x/no-arraybuffer-prototype-transfer"
description: "disallow the `ArrayBuffer.prototype.transfer` method"
since: "v7.6.0"
---

# es-x/no-arraybuffer-prototype-transfer
> disallow the `ArrayBuffer.prototype.transfer` method

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2024 [``ArrayBuffer.prototype.transfer`` methods](https://github.com/tc39/proposal-arraybuffer-transfer) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-arraybuffer-prototype-transfer: [error, { aggressive: true }] */
async function validateAndWriteSafeAndFast(arrayBuffer) {
  // Transfer to take ownership, which implementations can choose to
  // implement as a zero-copy move.
  const owned = arrayBuffer.transfer();

  // arrayBuffer is detached after this point.
  assert(arrayBuffer.detached);

  await validate(owned);
  await fs.writeFile("data.bin", owned);
}
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-arraybuffer-prototype-transfer: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v7.6.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-arraybuffer-prototype-transfer.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-arraybuffer-prototype-transfer.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
