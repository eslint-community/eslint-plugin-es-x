---
title: "es-x/no-nonstandard-temporal-instant-prototype-properties"
description: "disallow non-standard properties on Temporal.Instant instance"
---

# es-x/no-nonstandard-temporal-instant-prototype-properties
> disallow non-standard properties on Temporal.Instant instance

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

This rule reports non-standard properties on Temporal.Instant instance as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-temporal-instant-prototype-properties: error */
const foo = new Temporal.Instant();
foo.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-temporal-instant-prototype-properties": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-temporal-instant-prototype-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-temporal-instant-prototype-properties.js)
