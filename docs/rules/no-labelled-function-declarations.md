---
title: "es-x/no-labelled-function-declarations"
description: "disallow labelled function declarations"
since: "v5.1.0"
---

# es-x/no-labelled-function-declarations
> disallow labelled function declarations

This rule reports Annex B feature [the labelled function declarations](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-labelled-function-declarations) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" source-type="script">

```js
/*eslint es-x/no-labelled-function-declarations: error */
label: function f() {}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-labelled-function-declarations.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-labelled-function-declarations.js)
