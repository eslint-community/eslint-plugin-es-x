---
title: "es-x/no-trailing-dynamic-import-commas"
description: "disallow trailing commas in `import()`"
---

# es-x/no-trailing-dynamic-import-commas
> disallow trailing commas in `import()`

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-import-attributes] and [no-new-in-esnext]
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports trailing commas in `import()` as errors.\
Trailing commas in `import()` are now allowed in ES2025 [Import Attributes proposal](https://github.com/tc39/proposal-import-attributes#dynamic-import).

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground fix type="bad">

```js
/*eslint es-x/no-trailing-dynamic-import-commas: error */
const m1 = await import(source, )
const m2 = await import(source, options, )
const m3 = await import(
    source,
)
const m4 = await import(
    source,
    options,
)
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-trailing-dynamic-import-commas.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-trailing-dynamic-import-commas.js)

[no-import-attributes]: ../configs/index.md#no-import-attributes
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
