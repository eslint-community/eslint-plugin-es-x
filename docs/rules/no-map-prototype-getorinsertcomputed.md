---
title: "es-x/no-map-prototype-getorinsertcomputed"
description: "disallow the `Map.prototype.getOrInsertComputed` method"
---

# es-x/no-map-prototype-getorinsertcomputed
> disallow the `Map.prototype.getOrInsertComputed` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext] and [no-upsert]

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-map-prototype-getorinsertcomputed": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-map-prototype-getorinsertcomputed.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-map-prototype-getorinsertcomputed.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
[no-upsert]: ../configs/index.md#no-upsert
