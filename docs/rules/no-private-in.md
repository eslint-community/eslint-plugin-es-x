---
title: "es-x/no-private-in"
description: "disallow `#x in obj`"
since: "v5.0.0"
---

# es-x/no-private-in
> disallow `#x in obj`

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2022`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, and `plugin:es-x/restrict-to-es2021`

This rule reports ES2022 private in (`#x in obj`) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-private-in: error */
class A {
    #x;
    fn () {
        var hasX = #x in obj;
    }
}
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-private-in.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-private-in.js)
