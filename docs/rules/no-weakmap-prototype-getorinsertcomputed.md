---
title: "es-x/no-weakmap-prototype-getorinsertcomputed"
description: "disallow the `WeakMap.prototype.getOrInsertComputed` method"
since: "v9.4.0"
---

# es-x/no-weakmap-prototype-getorinsertcomputed
> disallow the `WeakMap.prototype.getOrInsertComputed` method

- ✅ The following configurations enable this rule: [no-new-in-esnext] and [no-upsert]

This rule reports ES2026 [`WeakMap.prototype.getOrInsertComputed` method](https://github.com/tc39/proposal-upsert) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-weakmap-prototype-getorinsertcomputed: error */
const foo = new WeakMap();
foo.getOrInsertComputed(key, () => value);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-weakmap-prototype-getorinsertcomputed": [
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

This rule was introduced in v9.4.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-weakmap-prototype-getorinsertcomputed.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-weakmap-prototype-getorinsertcomputed.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
[no-upsert]: ../configs/index.md#no-upsert
