---
title: "es-x/no-object-getprototypeof"
description: "disallow the `Object.getPrototypeOf` method"
since: "[eslint-plugin-es] v3.0.0"
---

# es-x/no-object-getprototypeof
> disallow the `Object.getPrototypeOf` method

- ✅ The following configurations enable this rule: [no-new-in-es5] and [restrict-to-es3]

This rule reports ES5 `Object.getPrototypeOf` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-object-getprototypeof: error */
var proto = Object.getPrototypeOf(obj)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-object-getprototypeof": [
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

This rule was introduced in [eslint-plugin-es] v3.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-object-getprototypeof.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-getprototypeof.js)

[no-new-in-es5]: ../configs/index.md#no-new-in-es5
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
