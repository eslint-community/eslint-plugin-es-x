---
title: "es-x/no-nonstandard-sharedarraybuffer-prototype-properties"
description: "disallow non-standard properties on SharedArrayBuffer instance"
since: "v8.2.0"
---

# es-x/no-nonstandard-sharedarraybuffer-prototype-properties
> disallow non-standard properties on SharedArrayBuffer instance

This rule reports non-standard properties on SharedArrayBuffer instance as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-sharedarraybuffer-prototype-properties: error */
const foo = new SharedArrayBuffer();
foo.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-sharedarraybuffer-prototype-properties": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-nonstandard-sharedarraybuffer-prototype-properties.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-nonstandard-sharedarraybuffer-prototype-properties.js)