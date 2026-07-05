---
title: "es-x/no-array-string-prototype-at"
description: "disallow the `{Array,String}.prototype.at()` methods"
since: "v5.0.0"
---

# es-x/no-array-string-prototype-at
> disallow the `{Array,String}.prototype.at()` methods

- 🚫 This rule was deprecated and replaced by [es-x/no-array-prototype-at](./no-array-prototype-at.md) and [es-x/no-string-prototype-at](./no-string-prototype-at.md) rules.

This rule reports ES2022 [`{Array,String,TypedArray}.prototype.at` methods](https://github.com/tc39/proposal-relative-indexing-method) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-array-string-prototype-at: [error, { aggressive: true }] */
foo.at(-1)
'str'.at(-1)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-array-string-prototype-at": [
      "error",
      {
        "aggressive": false,
        "allowTestedProperty": false
      }
    ]
  }
}
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 🚀 Version

This rule was introduced in v5.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-array-string-prototype-at.ts)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-array-string-prototype-at.ts)
