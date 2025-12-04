---
title: "es-x/no-json-israwjson"
description: "disallow the `JSON.isRawJSON` method"
---

# es-x/no-json-israwjson
> disallow the `JSON.isRawJSON` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-json-parse-with-source] and [no-new-in-esnext]

This rule reports ES2026 [`JSON.isRawJSON` method](https://github.com/tc39/proposal-json-parse-with-source) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-json-israwjson: error */
JSON.isRawJSON(object);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-json-israwjson": [
      "error",
      {
        "allowTestedProperty": false
      }
    ]
  }
}
```

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-json-israwjson.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-json-israwjson.js)

[no-json-parse-with-source]: ../configs/index.md#no-json-parse-with-source
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
