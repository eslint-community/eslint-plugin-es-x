---
title: "es-x/no-function-prototype-bind"
description: "disallow the `Function.prototype.bind` method"
since: "v5.0.0"
---

# es-x/no-function-prototype-bind
> disallow the `Function.prototype.bind` method

- ✅ The following configurations enable this rule: [no-new-in-es5] and [restrict-to-es3]

This rule reports ES5 `Function.prototype.bind` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-function-prototype-bind: [error, { aggressive: true }] */
foo.bind(this);

var foo = (function() {
    return this.bar
}).bind(this)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-function-prototype-bind": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-function-prototype-bind.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-function-prototype-bind.js)

[no-new-in-es5]: ../configs/index.md#no-new-in-es5
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
