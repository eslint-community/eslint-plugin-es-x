---
title: "es-x/no-nonstandard-intl-relativetimeformat-prototype-properties"
description: "disallow non-standard properties on Intl.RelativeTimeFormat instance"
---

# es-x/no-nonstandard-intl-relativetimeformat-prototype-properties
> disallow non-standard properties on Intl.RelativeTimeFormat instance

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

This rule reports non-standard properties on Intl.RelativeTimeFormat instance as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-intl-relativetimeformat-prototype-properties: error */
const foo = new Intl.RelativeTimeFormat();
foo.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-intl-relativetimeformat-prototype-properties": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-intl-relativetimeformat-prototype-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-intl-relativetimeformat-prototype-properties.js)
