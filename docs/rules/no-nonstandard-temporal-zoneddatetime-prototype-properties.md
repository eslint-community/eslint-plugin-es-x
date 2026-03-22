---
title: "es-x/no-nonstandard-temporal-zoneddatetime-prototype-properties"
description: "disallow non-standard properties on Temporal.ZonedDateTime instance"
since: "v9.6.0"
---

# es-x/no-nonstandard-temporal-zoneddatetime-prototype-properties
> disallow non-standard properties on Temporal.ZonedDateTime instance

This rule reports non-standard properties on Temporal.ZonedDateTime instance as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-temporal-zoneddatetime-prototype-properties: error */
const foo = new Temporal.ZonedDateTime();
foo.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-temporal-zoneddatetime-prototype-properties": [
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

## 🚀 Version

This rule was introduced in v9.6.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-temporal-zoneddatetime-prototype-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-temporal-zoneddatetime-prototype-properties.js)
