---
title: "es-x/no-array-fromasync"
description: "disallow the `Array.fromAsync` method"
since: "v8.7.0"
---

# es-x/no-array-fromasync
> disallow the `Array.fromAsync` method

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2026 [`Array.fromAsync` method](https://github.com/tc39/proposal-array-from-async) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-array-fromasync: error */
const arr = await Array.fromAsync(genPromises(4));
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-array-fromasync": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-array-fromasync.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-array-fromasync.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
