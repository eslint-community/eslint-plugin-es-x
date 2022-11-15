---
title: "es-x/no-object-getownpropertynames"
description: "disallow the `Object.getOwnPropertyNames` method"
since: "[eslint-plugin-es] v3.0.0"
---

# es-x/no-object-getownpropertynames
> disallow the `Object.getOwnPropertyNames` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 `Object.getOwnPropertyNames` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-object-getownpropertynames: error */
Object.getOwnPropertyNames(obj, "prop", {})
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v3.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-object-getownpropertynames.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-getownpropertynames.js)
