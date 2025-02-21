---
title: "es-x/no-nonstandard-intl-pluralrules-properties"
description: "disallow non-standard static properties on `Intl.PluralRules` class"
since: "v8.2.0"
---

# es-x/no-nonstandard-intl-pluralrules-properties
> disallow non-standard static properties on `Intl.PluralRules` class

This rule reports non-standard static properties on `Intl.PluralRules` class as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-intl-pluralrules-properties: error */
Intl.PluralRules.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-intl-pluralrules-properties": [
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

This rule was introduced in v8.2.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-intl-pluralrules-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-intl-pluralrules-properties.js)
