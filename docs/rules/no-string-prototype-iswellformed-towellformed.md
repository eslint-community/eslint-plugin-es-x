---
title: "es-x/no-string-prototype-iswellformed-towellformed"
description: "disallow the `String.prototype.{isWellFormed,toWellFormed}` methods"
since: "v7.1.0"
---

# es-x/no-string-prototype-iswellformed-towellformed
> disallow the `String.prototype.{isWellFormed,toWellFormed}` methods

- 🚫 This rule was deprecated and replaced by [es-x/no-string-prototype-iswellformed](./no-string-prototype-iswellformed.md) and [es-x/no-string-prototype-towellformed](./no-string-prototype-towellformed.md) rules.

This rule reports ES2024 [`String.prototype.{isWellFormed,toWellFormed}` methods](https://github.com/tc39/proposal-is-usv-string) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-string-prototype-iswellformed-towellformed: [error, { aggressive: true }] */
"str".isWellFormed()
"str".toWellFormed()
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-string-prototype-iswellformed-towellformed": [
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

This rule was introduced in v7.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-string-prototype-iswellformed-towellformed.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-string-prototype-iswellformed-towellformed.ts)
