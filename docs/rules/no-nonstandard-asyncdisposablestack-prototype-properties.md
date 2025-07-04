---
title: "es-x/no-nonstandard-asyncdisposablestack-prototype-properties"
description: "disallow non-standard properties on AsyncDisposableStack instance"
since: "v8.7.0"
---

# es-x/no-nonstandard-asyncdisposablestack-prototype-properties
> disallow non-standard properties on AsyncDisposableStack instance

This rule reports non-standard properties on AsyncDisposableStack instance as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-asyncdisposablestack-prototype-properties: error */
const foo = new AsyncDisposableStack();
foo.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-asyncdisposablestack-prototype-properties": [
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

This rule was introduced in v8.7.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-asyncdisposablestack-prototype-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-asyncdisposablestack-prototype-properties.js)
