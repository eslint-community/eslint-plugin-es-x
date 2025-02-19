---
title: "es-x/no-dataview-prototype-getfloat16-setfloat16"
description: "disallow the `DataView.prototype.{getFloat16,setFloat16}` methods"
---

# es-x/no-dataview-prototype-getfloat16-setfloat16
> disallow the `DataView.prototype.{getFloat16,setFloat16}` methods

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-float16array] and [no-new-in-esnext]

This rule reports ES2025 [`DataView.prototype.{getFloat16,setFloat16}` methods](https://github.com/tc39/proposal-float16array) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-dataview-prototype-getfloat16-setfloat16: error */
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setFloat16(1, Math.PI);

console.log(view.getFloat16(1));
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-dataview-prototype-getfloat16-setfloat16.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-dataview-prototype-getfloat16-setfloat16.js)

[no-float16array]: ../configs/index.md#no-float16array
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
