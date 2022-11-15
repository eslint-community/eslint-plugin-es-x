---
title: "es-x/no-rest-spread-properties"
description: "disallow rest/spread properties"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-rest-spread-properties
> disallow rest/spread properties

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2018`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, and `plugin:es-x/restrict-to-es2017`

This rule reports ES2018 [rest/spread properties](https://github.com/tc39/proposal-object-rest-spread#readme) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-rest-spread-properties: error */
let obj = {...obj0}
let {a, ...rest} = obj
;({a, ...rest} = obj)
function f({a, ...rest}) {}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-rest-spread-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-rest-spread-properties.js)
