---
title: "es-x/no-nonstandard-intl-displaynames-prototype-properties"
description: "disallow non-standard properties on Intl.DisplayNames instance"
---

# es-x/no-nonstandard-intl-displaynames-prototype-properties
> disallow non-standard properties on Intl.DisplayNames instance

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

This rule reports non-standard properties on Intl.DisplayNames instance as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-intl-displaynames-prototype-properties: error */
const foo = new Intl.DisplayNames(['en'], { type: 'region' });
foo.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-intl-displaynames-prototype-properties": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-intl-displaynames-prototype-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-intl-displaynames-prototype-properties.js)