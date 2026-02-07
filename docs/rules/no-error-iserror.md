---
title: "es-x/no-error-iserror"
description: "disallow the `Error.isError` method"
since: "v8.7.0"
---

# es-x/no-error-iserror
> disallow the `Error.isError` method

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2026 [`Error.isError` method](https://github.com/tc39/proposal-is-error) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-error-iserror: error */
Error.isError(e)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-error-iserror": [
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

## 🚀 Version

This rule was introduced in v8.7.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-error-iserror.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-error-iserror.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
