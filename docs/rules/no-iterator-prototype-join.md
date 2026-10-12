---
title: "es-x/no-iterator-prototype-join"
description: "disallow the `Iterator.prototype.join` method"
since: "v10.1.0"
---

# es-x/no-iterator-prototype-join
> disallow the `Iterator.prototype.join` method

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2027 [`Iterator.prototype.join`](https://github.com/tc39/proposal-iterator-join) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-prototype-join: error */
const result = Iterator.from([1, 2, 3]).join(", ");
```

</eslint-playground>

This rule does not report `Array.prototype.join` or typed array `join` methods.

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-iterator-prototype-join": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-prototype-join.ts)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-prototype-join.ts)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
