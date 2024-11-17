---
title: "es-x/no-nonstandard-boolean-properties"
description: "disallow non-standard properties on `Boolean` class"
since: "v8.2.0"
---

# es-x/no-nonstandard-boolean-properties
> disallow non-standard properties on `Boolean` class

This rule reports non-standard properties on `Boolean` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-boolean-properties: error */
Boolean.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-boolean-properties": [
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

This rule was introduced in v8.2.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-boolean-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-boolean-properties.js)
