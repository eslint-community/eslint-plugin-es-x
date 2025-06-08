---
title: "es-x/no-symbol-matchall"
description: "disallow the `Symbol.matchAll` property"
---

# es-x/no-symbol-matchall
> disallow the `Symbol.matchAll` property

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-es2015], [restrict-to-es3], and [restrict-to-es5]

This rule reports ES2015 [`Symbol.matchAll` property](https://github.com/tc39/proposal-string-matchall) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-symbol-matchall: error */
const re = /[0-9]+/g;
const str = "1234-5678";
const result = re[Symbol.matchAll](str);
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

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-symbol-matchall.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-symbol-matchall.js)

[no-new-in-es2015]: ../configs/index.md#no-new-in-es2015
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
[restrict-to-es5]: ../configs/index.md#restrict-to-es5
