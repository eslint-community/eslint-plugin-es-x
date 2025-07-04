---
title: "es-x/no-symbol-matchall"
description: "disallow the `Symbol.matchAll` property"
since: "v9.0.0"
---

# es-x/no-symbol-matchall
> disallow the `Symbol.matchAll` property

- ✅ The following configurations enable this rule: [no-new-in-es2020], [no-string-matchall], [restrict-to-es3], [restrict-to-es5], [restrict-to-es2015], [restrict-to-es2016], [restrict-to-es2017], [restrict-to-es2018], and [restrict-to-es2019]

This rule reports ES2020 [`Symbol.matchAll` property](https://github.com/tc39/proposal-string-matchall) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-symbol-matchall: error */
x[Symbol.matchAll]
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-symbol-matchall": [
      "error",
      {
        "allowTestedProperty": false
      }
    ]
  }
}
```

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 🚀 Version

This rule was introduced in v9.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-symbol-matchall.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-symbol-matchall.js)

[no-new-in-es2020]: ../configs/index.md#no-new-in-es2020
[no-string-matchall]: ../configs/index.md#no-string-matchall
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
[restrict-to-es2015]: ../configs/index.md#restrict-to-es2015
[restrict-to-es2016]: ../configs/index.md#restrict-to-es2016
[restrict-to-es2017]: ../configs/index.md#restrict-to-es2017
[restrict-to-es2018]: ../configs/index.md#restrict-to-es2018
[restrict-to-es2019]: ../configs/index.md#restrict-to-es2019
