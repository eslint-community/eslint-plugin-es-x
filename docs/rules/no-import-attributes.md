---
title: "es-x/no-import-attributes"
description: "disallow Import Attributes"
---

# es-x/no-import-attributes
> disallow Import Attributes

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-import-attributes] and [no-new-in-esnext]

This rule reports ES2025 [Import Attributes](https://github.com/tc39/proposal-import-attributes) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-import-attributes: error */
import json from "./foo.json" with { type: "json" };
const a = await import("foo.json", { with: { type: "json" } });
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-import-attributes.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-import-attributes.js)

[no-import-attributes]: ../configs/index.md#no-import-attributes
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
