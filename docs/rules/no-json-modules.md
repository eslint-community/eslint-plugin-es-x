---
title: "es-x/no-json-modules"
description: "disallow JSON Modules"
since: "v8.1.0"
---

# es-x/no-json-modules
> disallow JSON Modules

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2025 [JSON Modules](https://github.com/tc39/proposal-json-modules) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-json-modules: error */
import json from "./foo.json" with { type: "json" };
import("foo.json", { with: { type: "json" } });
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v8.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-json-modules.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-json-modules.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
