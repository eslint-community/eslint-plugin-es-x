---
title: "es-x/no-iterator-prototype-every"
description: "disallow the `Iterator.prototype.every` method"
since: "v8.1.0"
---

# es-x/no-iterator-prototype-every
> disallow the `Iterator.prototype.every` method

- ✅ The following configurations enable this rule: [no-iterator-helpers] and [no-new-in-esnext]

This rule reports ES2025 [`Iterator.prototype.every`](https://github.com/tc39/proposal-iterator-helpers) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-prototype-every: error */
const result = naturals()
  .every(n => n % 2);

function* naturals() {
  // ...
}
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-iterator-prototype-every": [
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

This rule was introduced in v8.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-prototype-every.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-prototype-every.js)

[no-iterator-helpers]: ../configs/index.md#no-iterator-helpers
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
