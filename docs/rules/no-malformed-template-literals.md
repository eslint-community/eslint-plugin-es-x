---
title: "es-x/no-malformed-template-literals"
description: "disallow template literals with invalid escape sequences"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-malformed-template-literals
> disallow template literals with invalid escape sequences

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2018`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, and `plugin:es-x/restrict-to-es2017`

This rule reports ES2018 [template literals with invalid escape sequences](https://github.com/tc39/proposal-template-literal-revision#readme) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-malformed-template-literals: error */
tag`\unicode`
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-malformed-template-literals.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-malformed-template-literals.js)
