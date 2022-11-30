---
title: "es-x/no-weakrefs"
description: "disallow the `WeakRef` and `FinalizationRegistry` class"
since: "[eslint-plugin-es] v4.0.0"
---

# es-x/no-weakrefs
> disallow the `WeakRef` and `FinalizationRegistry` class

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2021`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, and `plugin:es-x/restrict-to-es2020`

This rule reports ES2021 [WeakRefs](https://github.com/tc39/proposal-weakrefs) as errors.
This proposal includes the following two:

- `WeakRef` class
- `FinalizationRegistry` class

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-weakrefs: error */
let ref = new WeakRef()
let finalizationGroup = new FinalizationRegistry(() => {})
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v4.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-weakrefs.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-weakrefs.js)
