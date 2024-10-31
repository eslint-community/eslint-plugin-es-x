---
title: "es-x/no-dynamic-import-options"
description: "disallow the second parameter to `import()`"
---

# es-x/no-dynamic-import-options
> disallow the second parameter to `import()`

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-import-attributes] and [no-new-in-esnext]

This rule reports the second parameter to `import()` as errors.\
The second parameter to `import()` is an options bag, which was added in the ES2025 [Import Attributes proposal](https://github.com/tc39/proposal-import-attributes#dynamic-import).

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-dynamic-import-options: error */
const m = await import(source, options)
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-dynamic-import-options.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-dynamic-import-options.js)

[no-import-attributes]: ../configs/index.md#no-import-attributes
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
