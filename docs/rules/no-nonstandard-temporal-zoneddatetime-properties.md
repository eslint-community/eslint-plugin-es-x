---
title: "es-x/no-nonstandard-temporal-zoneddatetime-properties"
description: "disallow non-standard static properties on `Temporal.ZonedDateTime` class"
---

# es-x/no-nonstandard-temporal-zoneddatetime-properties
> disallow non-standard static properties on `Temporal.ZonedDateTime` class

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

This rule reports non-standard static properties on `Temporal.ZonedDateTime` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-temporal-zoneddatetime-properties: error */
Temporal.ZonedDateTime.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-temporal-zoneddatetime-properties": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-temporal-zoneddatetime-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-temporal-zoneddatetime-properties.js)
