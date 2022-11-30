---
title: "es-x/no-number-parseint"
description: "disallow the `Number.parseInt` method"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-number-parseint
> disallow the `Number.parseInt` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 `Number.parseInt` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-number-parseint: error */
const b = Number.parseInt(value)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-number-parseint.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-number-parseint.js)
