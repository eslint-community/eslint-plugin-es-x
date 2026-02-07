---
title: "es-x/no-json-parse-reviver-context-parameter"
description: "disallow the `context` parameter in `JSON.parse` reviver function"
since: "v9.3.0"
---

# es-x/no-json-parse-reviver-context-parameter
> disallow the `context` parameter in `JSON.parse` reviver function

- ✅ The following configurations enable this rule: [no-json-parse-with-source] and [no-new-in-esnext]

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
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
