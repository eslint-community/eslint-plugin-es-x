---
title: "es-x/no-dynamic-import"
description: "disallow `import()` syntax"
since: "[eslint-plugin-es] v2.0.0"
---

# es-x/no-dynamic-import
> disallow `import()` syntax

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2020`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, and `plugin:es-x/restrict-to-es2019`

This rule reports ES2020 [`import()` syntax](https://github.com/tc39/proposal-dynamic-import) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-dynamic-import: error */
async function f() {
    const a = await import("source")
}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v2.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-dynamic-import.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-dynamic-import.js)
