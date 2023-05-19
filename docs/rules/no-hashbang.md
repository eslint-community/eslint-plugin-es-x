---
title: "es-x/no-hashbang"
description: "disallow Hashbang comments"
since: "v5.3.0"
---

# es-x/no-hashbang
> disallow Hashbang comments

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2023`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, `plugin:es-x/restrict-to-es2021`, and `plugin:es-x/restrict-to-es2022`

This rule reports ES2023 [Hashbang comment](https://github.com/tc39/proposal-hashbang) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
#!/usr/bin/env node
/*eslint es-x/no-hashbang: error */
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.3.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-hashbang.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-hashbang.js)
