---
title: "es-x/no-date-prototype-totemporalinstant"
description: "disallow the `Date.prototype.toTemporalInstant` method"
since: "v9.6.0"
---

# es-x/no-date-prototype-totemporalinstant
> disallow the `Date.prototype.toTemporalInstant` method

- ✅ The following configurations enable this rule: [no-new-in-esnext] and [no-temporal]

This rule reports ES2026 [`Date.prototype.toTemporalInstant` method](https://github.com/tc39/proposal-temporal) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-date-prototype-totemporalinstant: error */
const foo = new Date();
foo.toTemporalInstant();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-date-prototype-totemporalinstant": [
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

This rule was introduced in v9.6.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-date-prototype-totemporalinstant.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-date-prototype-totemporalinstant.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
[no-temporal]: ../configs/index.md#no-temporal
