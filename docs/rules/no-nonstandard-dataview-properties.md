---
title: "es-x/no-nonstandard-dataview-properties"
description: "disallow non-standard static properties on `DataView` class"
since: "v8.4.0"
---

# es-x/no-nonstandard-dataview-properties
> disallow non-standard static properties on `DataView` class

This rule reports non-standard static properties on `DataView` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-dataview-properties: error */
DataView.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-dataview-properties": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-dataview-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-dataview-properties.js)