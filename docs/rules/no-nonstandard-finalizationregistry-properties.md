---
title: "es-x/no-nonstandard-finalizationregistry-properties"
description: "disallow non-standard static properties on `FinalizationRegistry` class"
---

# es-x/no-nonstandard-finalizationregistry-properties
> disallow non-standard static properties on `FinalizationRegistry` class

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

This rule reports non-standard static properties on `FinalizationRegistry` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-finalizationregistry-properties: error */
FinalizationRegistry.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-finalizationregistry-properties": [
      "error",
      {
        "allow": []
      }
    ]
  }
}
```

### allow: string[]

An array of non-standard property names to allow.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-finalizationregistry-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-finalizationregistry-properties.js)
