---
title: "es-x/no-string-prototype-trim"
description: "disallow the `String.prototype.trim` method"
since: "[eslint-plugin-es] v5.0.0"
---

# es-x/no-string-prototype-trim
> disallow the `String.prototype.trim` method

- ✅ The following configurations enable this rule: [no-new-in-es5] and [restrict-to-es3]

This rule reports ES5 `String.prototype.trim` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-string-prototype-trim: [error, { aggressive: true }] */
foo.trim()
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-string-prototype-trim": [
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

This rule was introduced in [eslint-plugin-es] v5.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-string-prototype-trim.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-string-prototype-trim.js)

[no-new-in-es5]: ../configs/index.md#no-new-in-es5
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
