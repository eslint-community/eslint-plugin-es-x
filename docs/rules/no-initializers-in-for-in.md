---
title: "es-x/no-initializers-in-for-in"
description: "disallow initializers in for-in heads"
since: "v5.1.0"
---

# es-x/no-initializers-in-for-in
> disallow initializers in for-in heads

This rule reports initializers in for-in statement heads as errors.

See [Annex B - Initializers in ForIn Statement Heads](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-initializers-in-forin-statement-heads).

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" source-type="script">

```js
/*eslint es-x/no-initializers-in-for-in: error */
for (var x = 42 in obj) { /**/ }
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-initializers-in-for-in.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-initializers-in-for-in.js)
