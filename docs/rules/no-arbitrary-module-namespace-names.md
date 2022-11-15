---
title: "es-x/no-arbitrary-module-namespace-names"
description: "disallow arbitrary module namespace names"
since: "v5.0.0"
---

# es-x/no-arbitrary-module-namespace-names
> disallow arbitrary module namespace names

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2022`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, and `plugin:es-x/restrict-to-es2021`

This rule reports ES2022 arbitrary module namespace names as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-arbitrary-module-namespace-names: error */
export * as "ns" from "mod"
export {foo as "bar"} from "mod"
import {"foo" as bar} from "mod"
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-arbitrary-module-namespace-names.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-arbitrary-module-namespace-names.js)
