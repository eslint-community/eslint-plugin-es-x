---
title: "es-x/no-string-prototype-trimstart-trimend"
description: "disallow the `String.prototype.{trimStart,trimEnd}` methods"
since: "[eslint-plugin-es] v5.0.0"
---

# es-x/no-string-prototype-trimstart-trimend
> disallow the `String.prototype.{trimStart,trimEnd}` methods

- ✅ The following configurations enable this rule: [no-new-in-es2019], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], and [restrict-to-es2018]

This rule reports ES2019 [`String.prototype.{trimStart,trimEnd}` methods](https://github.com/tc39/proposal-string-left-right-trim) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-string-prototype-trimstart-trimend: [error, { aggressive: true }] */
foo.trimStart()
foo.trimEnd()
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-string-prototype-trimstart-trimend": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-string-prototype-trimstart-trimend.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-string-prototype-trimstart-trimend.js)

[no-new-in-es2019]: ../configs/index.md#no-new-in-es2019
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
