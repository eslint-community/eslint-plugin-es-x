---
title: "es-x/no-iterator-prototype-windows"
description: "disallow the `Iterator.prototype.windows` method"
since: "v10.1.0"
---

# es-x/no-iterator-prototype-windows
> disallow the `Iterator.prototype.windows` method

- ✅ The following configurations enable this rule: [no-iterator-chunking] and [no-new-in-esnext]

This rule reports ES2027 [`Iterator.prototype.windows`](https://github.com/tc39/proposal-iterator-chunking) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-prototype-windows: error */
const result = Iterator.from([1, 2, 3, 4]).windows(2);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-iterator-prototype-windows": [
      "error",
      {
        "aggressive": false,
        "allowTestedProperty": false
      }
    ]
  }
}
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 🚀 Version

This rule was introduced in v10.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-prototype-windows.ts)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-prototype-windows.ts)

[no-iterator-chunking]: ../configs/index.md#no-iterator-chunking
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
