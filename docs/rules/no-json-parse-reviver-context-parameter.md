---
title: "es-x/no-json-parse-reviver-context-parameter"
description: "disallow the `context` parameter in `JSON.parse` reviver function"
since: "v9.3.0"
---

# es-x/no-json-parse-reviver-context-parameter
> disallow the `context` parameter in `JSON.parse` reviver function

- ✅ The following configurations enable this rule: [no-json-parse-with-source], [no-new-in-es2026], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], [restrict-to-es2019], [restrict-to-es2020], [restrict-to-es2021], [restrict-to-es2022], [restrict-to-es2023], [restrict-to-es2024], and [restrict-to-es2025]

This rule reports ES2026 [`JSON.parse` reviver `context` parameter](https://github.com/tc39/proposal-json-parse-with-source) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-json-parse-reviver-context-parameter: error */
JSON.parse(
    '{"key": "value"}',
    (
        key,
        value,
        context // This is the context parameter
    ) => {
    return value;
});
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v9.3.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-json-parse-reviver-context-parameter.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-json-parse-reviver-context-parameter.js)

[no-json-parse-with-source]: ../configs/index.md#no-json-parse-with-source
[no-new-in-es2026]: ../configs/index.md#no-new-in-es2026
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
[restrict-to-es2019]: ../configs/index.md#restrict-to-es2019
[restrict-to-es2020]: ../configs/index.md#restrict-to-es2020
[restrict-to-es2021]: ../configs/index.md#restrict-to-es2021
[restrict-to-es2022]: ../configs/index.md#restrict-to-es2022
[restrict-to-es2023]: ../configs/index.md#restrict-to-es2023
[restrict-to-es2024]: ../configs/index.md#restrict-to-es2024
[restrict-to-es2025]: ../configs/index.md#restrict-to-es2025
