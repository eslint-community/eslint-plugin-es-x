---
title: "es-x/no-symbol-asyncdispose"
description: "disallow the `Symbol.asyncDispose` property"
---

# es-x/no-symbol-asyncdispose
> disallow the `Symbol.asyncDispose` property

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-explicit-resource-management] and [no-new-in-esnext]

This rule reports ES2026 [`Symbol.asyncDispose` property](https://github.com/tc39/proposal-explicit-resource-management) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-symbol-asyncdispose: error */
x[Symbol.asyncDispose];
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-symbol-asyncdispose": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-symbol-asyncdispose.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-symbol-asyncdispose.js)

[no-explicit-resource-management]: ../configs/index.md#no-explicit-resource-management
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
