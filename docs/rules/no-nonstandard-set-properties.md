---
title: "es-x/no-nonstandard-set-properties"
description: "disallow non-standard static properties on `Set` class"
since: "v8.4.0"
---

# es-x/no-nonstandard-set-properties
> disallow non-standard static properties on `Set` class

This rule reports non-standard static properties on `Set` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-set-properties: error */
Set.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-set-properties": [
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

## 🚀 Version

This rule was introduced in v8.4.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-set-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-set-properties.js)