---
title: "es-x/no-map-prototype-getorinsert"
description: "disallow the `Map.prototype.getOrInsert` method"
---

# es-x/no-map-prototype-getorinsert
> disallow the `Map.prototype.getOrInsert` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext] and [no-upsert]

This rule reports ES2026 [`Map.prototype.getOrInsert` method](https://github.com/tc39/proposal-upsert) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-map-prototype-getorinsert: error */
const foo = new Map();
foo.getOrInsert(key, value);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-map-prototype-getorinsert": [
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

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-map-prototype-getorinsert.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-map-prototype-getorinsert.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
[no-upsert]: ../configs/index.md#no-upsert
