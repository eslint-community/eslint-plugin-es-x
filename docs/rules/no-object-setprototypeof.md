---
title: "es-x/no-object-setprototypeof"
description: "disallow the `Object.setPrototypeOf` method"
since: "[eslint-plugin-es] v1.2.0"
---

# es-x/no-object-setprototypeof
> disallow the `Object.setPrototypeOf` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 `Object.setPrototypeOf` as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-object-setprototypeof: error */
Object.setPrototypeOf(obj, proto)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.2.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-object-setprototypeof.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-setprototypeof.js)
