---
title: "es-x/no-legacy-object-prototype-accessor-methods"
description: "disallow legacy `Object.prototype` accessor methods"
since: "v5.2.0"
---

# es-x/no-legacy-object-prototype-accessor-methods
> disallow legacy `Object.prototype` accessor methods

This rule reports [the legacy Object.prototype accessor methods](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype-legacy-accessor-methods) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-legacy-object-prototype-accessor-methods: error */
foo.__defineGetter__(prop, func)
foo.__defineSetter__(prop, val, func)
foo.__lookupGetter__(prop)
foo.__lookupSetter__(prop)
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.2.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-legacy-object-prototype-accessor-methods.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-legacy-object-prototype-accessor-methods.js)
