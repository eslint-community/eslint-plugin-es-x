---
title: "es-x/no-nonstandard-error-properties"
description: "disallow non-standard static properties on `Error` class"
---

# es-x/no-nonstandard-error-properties
> disallow non-standard static properties on `Error` class

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

This rule reports non-standard static properties on `Error` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-error-properties: error */
Error.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-error-properties": [
      "error",
      {
        "allow": [],
        "allowTestedProperty": false
      }
    ]
  }
}
```

### allow: string[]

An array of non-standard property names to allow.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-error-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-error-properties.js)
